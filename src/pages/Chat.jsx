import React ,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined)
  const [currentChat,setCurrentChat] = useState(undefined)
  const [isLoaded,setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(()=>{
    async function fatchLocalStorage(){
      if (!localStorage.getItem("chat-app-user")){
        navigate("/login");
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setIsLoaded(true);
      }
    }
    fatchLocalStorage();
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit('add-user',currentUser._id)
    }
  },[currentUser])

  useEffect(()=>{
    async function fatchAvatar(){
      // console.log(currentUser);
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }else{
          navigate("/setAvatar")
        }
      }
    }
    fatchAvatar();
  },[currentUser])

  const handleChatChange = (chat) =>{
    setCurrentChat(chat)
  }

  return (
    
    // <Container>
    //   <div className='container'>
    //     <Contacts contacts={contacts} currentUser = {currentUser} changeChat ={handleChatChange  }/>
    //     {isLoaded && currentChat === undefined?(
    //         <Welcome currentUser = {currentUser}/>
    //     ):(
    //         <ChatContainer currentChat = {currentChat} currentUser = {currentUser} socket = {socket} />
    //     )
    //     }  
    //   </div>
    // </Container>

      <Container>
        <div className="container">
          {windowWidth<=767 ?(currentChat ?(<ChatContainer currentChat = {currentChat} currentUser = {currentUser} socket = {socket} />):(<Contacts contacts={contacts} currentUser = {currentUser} changeChat ={handleChatChange  }/>)): (<>
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
            )}
          </>) }
        </div>
      </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 95vh;
    width: 95vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 768px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 200px) and (max-width: 767px){
      grid-template-columns: 95% ;
    }
  }
`;

export default Chat