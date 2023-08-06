import React from 'react'
import { styled } from 'styled-components'
import Robot from "../asset/robot.gif"

export default function Welcome({currentUser}) {
  return (
    <Container>
      <img src={Robot} alt="Welcome Screen" />
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:25rem;
}
h1{
    margin-bottom:1.5rem;
}
span{
    color:yellow;
}
`;