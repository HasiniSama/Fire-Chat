import React, { useState } from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, 
  signInWithPopup, signInWithRedirect } from "firebase/auth"
import { auth, db } from "../firebase"
import { setDoc, updateDoc, doc, Timestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button, { DisabledButton } from "../components/Button"
import Icon from "../components/Icon"
import { FaGoogle, FaArrowCircleRight } from "react-icons/fa"
import backgroundImg from '../assets/images/sphere_background.jpg'
import NavBar from '../components/Navbar'

function SignIn() {

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  })

  const navigate = useNavigate()

  const { email, password, error, loading } = data

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({ ...data, error: null, loading: true })
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" })
    }else{
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
  
        await updateDoc(doc(db, "users", result.user.uid), {
          isOnline: true,
        })
        setData({
          email: "",
          password: "",
          error: null,
          loading: false,
        })
        navigate("/")
      } catch (err) {
        if ( err.code === 'auth/wrong-password'){
          setData({ ...data, error: "Wrong password", loading: false })
        }else if( err.code === 'auth/user-not-found'){
          setData({ ...data, error: "User email not found", loading: false })
        }else{
          setData({ ...data, error: "Error creating account", loading: false })
          console.log(err.message)
        }
      }
    }
  }

  // const provider = new GoogleAuthProvider()

  // const signInWithGoogle = async (e) => {
  //   e.preventDefault()
  //   try {
  //       const result =  await signInWithPopup(auth, provider)
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result)
  //       const token = credential.accessToken
  //       // The signed-in user info.
  //       const user = result.user

  //       await setDoc(doc(db, "users", result.user.uid), {
  //         uid: result.user.uid,
  //         name: user.displayName,
  //         email: user.email,
  //         createdAt: Timestamp.fromDate(new Date()),
  //         isOnline: true,
  //       })
  //       navigate("/")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const navigateToSignup = (e) => {
    e.preventDefault()
    navigate("/signup")
  }

  return (
    <Background>
      <NavBar/>
      <MainContainer>
        <WelcomeText>WELCOME</WelcomeText>
        <InputContainer>
          <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChange}/>
          <Input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
        </InputContainer>
        <ButtonContainer onClick={handleSubmit}>
          {error ? <ErrorText>{error}!</ErrorText> : null}
          <Button content={loading ? "Logging in ..." : "Start Chatting"} disabled={loading} />
        </ButtonContainer>
        <LoginWith>OR</LoginWith>
        <HorizontalRule />
        <ButtonContainer>
          <DisabledButton content="LOGIN WITH GOOGLE">
            <Icon >
              <FaGoogle />
            </Icon>
          </DisabledButton>
        </ButtonContainer>
        <Text onClick={navigateToSignup}>Create An Account? 
          <IconContainer>
            <Icon >
                <FaArrowCircleRight />
            </Icon>
          </IconContainer> 
        </Text>
      </MainContainer>
    </Background>
  )
}

const Background = styled.div`
  background-image: url(${backgroundImg});
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -ms-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position:fixed;
  width: 100%;
  height: 100%;
`
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
`

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: white;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  width: 100%;
`

const ButtonContainer = styled.div`
  margin: 0rem 0 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

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
`

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
`

const ErrorText = styled.h6`
  color:  var(--color-1);
  margin: 1rem;
  padding: 0.2rem 1rem;
  background: white;
  border-radius: 1rem;
  text-align: center;
`
const IconContainer = styled.div`

`
const Text = styled.h4`
  color: white;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  transition: .3s;

  &:hover{
    transform: scale(1.05);
    ${IconContainer} {
      animation: slide1 1s ease-in-out infinite;
    }
  }

  @keyframes slide1 {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(10px, 0);
  }
}
`

export default SignIn