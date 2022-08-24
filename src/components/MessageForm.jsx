import React from "react";
import Attachment from "../components/svg/Attachment";
import styled from "styled-components";
import {ShortButton} from "../components/Button";

const MessageForm = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <MainContainer onSubmit={handleSubmit}>
        <label htmlFor="img"><Attachment /></label>
        <Input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
        />
        <Input
            type="text"
            placeholder="Enter a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />
        <ButtonContainer>
            <ShortButton content="Send" />
        </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.form`
    position: absolute;
    bottom: 0;
    padding-bottom: 30px;
    left: 20%;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 767px) {
        left: 3%;
        right: 0;
        bottom: 5px;
    }
`
const Input = styled.input`
    background-color: 'transparent';
    background-image:linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0));
    backdrop-filter: blur(5px);
    box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
    width: 42vw;
    height: 2.5rem;
    margin: 0px 10px 10px;
    padding: 10px;
    padding-left: 1.5rem;
    border-radius: 30px;
    outline: none;
    border: none;

    @media screen and (max-width: 576px) {
        width: 50vw;
        margin: 0px 10px;
    }
`

const ButtonContainer = styled.div`
    width: 15vw;
    margin: 0px 0px 40px;
    padding: 5px;
`

export default MessageForm;