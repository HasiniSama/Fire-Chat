import React from 'react'
import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Input from "../components/Input";
import { FaGoogle } from "react-icons/fa";

function SignIn() {
  return (
      <MainContainer>
        <WelcomeText>WELCOME</WelcomeText>
        <InputContainer>
          <Input type="text" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </InputContainer>
        <ButtonContainer>
          <Button content="Start Chatting" />
        </ButtonContainer>
        <LoginWith>OR</LoginWith>
        <HorizontalRule />
        <ButtonContainer>
          <Button content="LOGIN WITH GOOGLE">
            <Icon >
              <FaGoogle />
            </Icon>
          </Button>
        </ButtonContainer>
      </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background-color: 'transparent';
  box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
  border-radius: 10px;
  border: 1px solid rgb(255,255,255,0.3);
  border-right: 0;
  border-bottom: 0;
  color: var(--color-1);
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  @media only screen and (min-width: 1280px) {
    color: white;
  }
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.1rem;
  border-radius: 0.8rem;
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export default SignIn