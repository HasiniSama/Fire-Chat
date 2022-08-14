import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { FaArrowCircleRight } from "react-icons/fa";

function SignUp() {

  const [data, setData] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
    error: null,
    loading: false,
  });

  const { name, email, pass, cpass, error, loading } = data;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !pass || !cpass) {
      setData({ ...data, error: "All fields are required" });
    }else if (cpass !== pass){
      setData({ ...data, error: "Passwords doesn't match" });
    }else{
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
        });
        setData({
          name: "",
          email: "",
          password: "",
          error: null,
          loading: false,
        });
        alert("Account Successfully Created!")
        navigate("/signin");
      } catch (err) {
        if ( err.code === 'auth/email-already-in-use'){
          setData({ ...data, error: "Email already in use", loading: false });
        }else if( err.code === 'auth/weak-password'){
          setData({ ...data, error: "Password should be minimum 6 characters", loading: false });
        }else{
          setData({ ...data, error: "Error creating account", loading: false });
          console.log(err.message)
        }
      }
    }
  };

  const navigateToSignin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
      <MainContainer onSubmit={handleSubmit}>
        <WelcomeText>Sign Up</WelcomeText>
        <InputContainer>
          <Input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={email} onChange={handleChange}/>
          <Input type="password" name="pass" placeholder="Password" value={pass} onChange={handleChange} />
          <Input type="password" name="cpass" placeholder="Confirm Password" value={cpass} onChange={handleChange}/>
        </InputContainer>
        <ButtonContainer>
          <Button content={loading ? "Creating ..." : "Create an Account"}  disabled={loading}/>
          {error ? <ErrorText>{error}!</ErrorText> : null}
        </ButtonContainer>
        <Text onClick={navigateToSignin}>Have An Account?  
            <Icon >
                <FaArrowCircleRight />
            </Icon>
        </Text>
      </MainContainer>
  )
}

const MainContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  width: 30vw;
  background-color: 'transparent';
  box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
  border-radius: 10px;
  border: 1px solid rgb(255,255,255,0.3);
  border-right: 0;
  border-bottom: 0;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
  }
  @media only screen and (min-width: 768px) {
    width: 80vw;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
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
  margin: 0rem 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const ErrorText = styled.h6`
  color:  var(--color-1);
  margin: 1rem;
  padding: 0.2rem 1rem;
  background: white;
  border-radius: 1rem;
  text-align: center;
`;

const Text = styled.h4`
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

export default SignUp