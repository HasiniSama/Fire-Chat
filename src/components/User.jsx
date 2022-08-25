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
                        <LastMessage>
                            <TextName>{user.name}</TextName>
                            {data && (
                                <Truncate status={data?.from !== sender && data?.unread ? "undread" : ""}>
                                    {data.from === sender ? "Me:  " : null}
                                    {data.text}
                                </Truncate>
                            )}
                        </LastMessage>     
                        {data?.from !== sender && data?.unread && (
                            <Unread>New</Unread>
                        )}
                    </UserDetails>
                    <UserStatus style={{ background: user.isOnline ? "#34eb52" : "#eb4034" }} />
                </UserInfo>
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
    
    background:${props => {
        const status = props.status

        if (status === 'selected_user') {
            return 'rgba(255,255,255,0.1)';
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
`

const UserDetails = styled.div`
    display: flex;
`

const Img = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid var(--color-2);

`
const LastMessage = styled.div`
    display: flex;
    flex-direction: column;
`
const TextName = styled.h4`
    margin-left: 20px;
    margin-top: 5px;
`

const UserStatus = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 5px;
`
const Truncate = styled.p`
    font-size: 14px;
    margin-left: 20px;
    margin-top: 5px;
    white-space: nowrap;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;

    color:${props => {
        const status = props.status

        if (status === 'undread') {
            return 'rgb(255,255,255)';
        } else {
            return 'rgb(255,255,255, 0.6)';
        } 
    }};
`
const Unread = styled.small`
    margin-left: 10px;
    height: 25px;
    background: #FE53BB;
    padding: 4px 6px;
    border-radius: 20px;
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
            return 'rgba(255,255,255,0.1)';
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