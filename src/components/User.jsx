import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import UserImg from '../assets/images/user.png'
import { onSnapshot, doc } from "firebase/firestore"
import { db } from "../firebase"

const User = ({ sender, user, selectUser, chat }) => {

    const receiver = user?.uid
    const [data, setData] = useState("")

    useEffect(() => {
        const id = sender > receiver ? `${sender + receiver}` : `${receiver + sender}`
        let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
            setData(doc.data())
        })
        return () => unsub()
    }, [])

    return (
        <>
            <UserWrapper status={chat.name === user.name ? "selected_user" : ""} onClick={() => selectUser(user)}>
                <UserInfo>
                    <UserDetails>
                        <Img src={user.avatar || UserImg} alt="avatar"></Img>
                        <TextName>{user.name}</TextName>
                        {data?.from !== sender && data?.unread && (
                            <Unread>New</Unread>
                        )}
                    </UserDetails>
                    <UserStatus style={{ background: user.isOnline ? "#34eb52" : "#eb4034" }} />
                </UserInfo>
                {data && (
                    <Truncate>
                        {data.from === sender ? "Me:  " : null}
                        {data.text}
                    </Truncate>
                )}
            </UserWrapper>
            <SmallWrapper status={chat.name === user.name ? "selected_user" : ""} 
                    onClick={() => selectUser(user)}>
                    <SmallImg src={user.avatar || UserImg} alt="avatar"/>
            </SmallWrapper>
        </>
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

    background:${props => {
        const status = props.status

        if (status === 'selected_user') {
            return '';
        } else {
            return 'var(--color-6)';
        } 
    }};

    @media screen and (max-width: 576px) {
        display: none;
    }
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
const Truncate = styled.p`
    font-size: 14px;
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Unread = styled.small`
    margin-left: 10px;
    background: var(--color-3);
    color: white;
    padding: 2px 4px;
    border-radius: 10px;
`
const SmallWrapper = styled.div`
    display: none;
    @media screen and (max-width: 576px) {
        display: block;
        padding: 10px 0px;
        text-align: center;
        cursor: pointer;
    }

    background:${props => {
        const status = props.status

        if (status === 'selected_user') {
            return 'white';
        } else {
            return 'var(--color-6)';
        } 
    }};
`
const SmallImg = styled(Img)`
    @media screen and (max-width: 576px) {
        display: inline-block;
    }
`
export default User