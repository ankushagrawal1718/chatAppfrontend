import React, { useState } from "react";
import { styled } from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";


export default function ChatInput({handleSendMsg}) {
  // console.log(Picker);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat=(event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg('');
    }

  }
  const handleEmojiClick = (event, emojiObject) => {
    // console.log(Picker);
    // console.log("Event:", event);
    // console.log(emojiObject);
    let message = msg;
    message += event.emoji;
    setMsg(message);
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 4% 94%;
  align-items: center;
  background-color: #080420;
  padding: 0 1rem;
  padding-bottom: 0.3rem;
  margin: 5px 0;
  gap: 2%;
  .button-container {
    align-items: center;
    color: white;
    gap: 1rem;
    margin:0 auto;
    .emoji {
      position: relative;
      display:flex;
      align-item:center;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact{
        position: absolute;
        top: -30rem;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        
        .epr-body-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        li.epr-emoji-category>.epr-emoji-category-label{
          background-color:  #080420;
          border-color: #9a86f3;
          color:white;
        }
        .emoji-group:before{
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    height: 50px;
    border-radius: 2rem;
    display: flex;
    margin-left:10px;
    align-content: center;
    gap: 0.8rem;
    background-color: #ffffff34;
    input {
      width: 100%;
    //    height:60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      width: 44px;
      margin: auto 0.8rem;
      padding: 0.4rem 0.1rem;
      border-radius: 50%;
      font-size: 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      cursor: pointer;
      border: none;
      svg {
        font-size: 1.5rem;
        padding-left:3px;
      }
    }
  }
`;
