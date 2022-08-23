import React from 'react'
import styled from "styled-components"
import UserImg from '../assets/images/user.png'

const User = ({ user, selectUser }) => {
  return (
    <UserWrapper onClick={() => selectUser(user)}>
        <UserInfo>
            <UserDetails>
                <Img src={user.avatar || UserImg} alt="avatar"></Img>
                <TextName>{user.name}</TextName>
            </UserDetails>
            <UserStatus style={{ background: user.isOnline ? "#34eb52" : "#eb4034" }} />
        </UserInfo>
    </UserWrapper>
  )
}

const UserWrapper = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;
    background-color: 'transparent';
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0));
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
    border-radius: 20px;
    border: 1px solid rgb(255,255,255,0.3);
`

const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const UserDetails = styled.div`
    display: flex;
    align-items: center;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid var(--color-2);

`
const TextName = styled.h4`
    margin-left: 10px;
    color: white;
`

const UserStatus = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
`

export default User