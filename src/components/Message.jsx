import React, { useRef, useEffect } from "react"
import Moment from "react-moment"
import styled from "styled-components"

const Message = ({ msg, sender }) => {
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [msg])

  return (
    msg.from === sender ? 
    <SenderMessageWapper ref={scrollRef}>
        <SenderMessageText>
            {msg.media ? <Img src={msg.media} alt={msg.text} /> : null}
            {msg.text}
            <br />
            <TimeText>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </TimeText>
        </SenderMessageText>
    </SenderMessageWapper> :
    <ReceiverMessageWapper ref={scrollRef}>
        <ReceiverMessageText>
            {msg.media ? <Img src={msg.media} alt={msg.text} /> : null}
            {msg.text}
            <br />
            <TimeText>
                <Moment fromNow>{msg.createdAt.toDate()}</Moment>
            </TimeText>
        </ReceiverMessageText>
    </ReceiverMessageWapper>

  )
}

const MessageWapper = styled.div`
    margin-top: 5px;
    padding: 0px 5px;

`
const SenderMessageWapper = styled(MessageWapper)`
    text-align: right;
`
const ReceiverMessageWapper = styled(MessageWapper)`
    
`
const MessageText = styled.p`
    padding: 10px;
    display: inline-block;
    max-width: 50%;
    text-align: left;
    border-radius: 5px;

    @media screen and (max-width: 767px) {
        max-width: 75%;
    }

    @media screen and (max-width: 576px) {
        max-width: 100%;
    }
`
const SenderMessageText = styled(MessageText)`
    background: var(--color-1);
    color: white;
`
const ReceiverMessageText = styled(MessageText)`
    background: var(--color-3);
    color: white;
`
const Img = styled.img`
    width: 100%;
    border-radius: 5px;
`
const TimeText = styled.small`
    display: inline-block;
    margin-top: 15px;
    opacity: 0.8;
`

export default Message