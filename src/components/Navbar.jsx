import React, { useContext } from 'react'
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { auth, db } from "../firebase"
import { signOut } from "firebase/auth"
import { updateDoc, doc } from "firebase/firestore"
import { AuthContext } from "../context/auth"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleSignout = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          isOnline: false,
        });
        await signOut(auth);
        navigate("/signin");
    };

    return (
        <NavContainer>
            <NameText>Fire Chat</NameText>
            <Navdiv>
            { user ?
            <>
                <NavLink to="/profile" style={{ textDecoration: 'none' }}><NavText>Profile</NavText></NavLink>
                <NavText onClick={handleSignout}>Logout</NavText>
            </> : <></>}
            </Navdiv>
        </NavContainer>
  )
}

const NavContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0px 20px;
    background-color: 'transparent';
`;

const Navdiv = styled.div`
    display: flex;
    align-items: center;
`;

const NavText = styled.h3`
    color : var(--color-2);
    text-decoration: none !important;
    font-size: 1em;
    padding: 0.5rem 2rem;
    border: 1px solid rgb(255,255,255,0.4);
    border-right: 0.5px solid rgb(255,255,255,0.2);
    border-bottom: 0.5px solid rgb(255,255,255,0.2);
    border-radius: 10px;
    box-shadow: 0 5px 45px rgb(0,0,0,0.1);
    backdrop-filter: blur(2px);
    transition: 0.5s;
    margin: 1rem;
    cursor: pointer;
    overflow: hidden;

    /* &:hover{
        transform: scale(1.05);
        transform: translateY(-20px);
    } */

    &::before{
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        width: 25px;
        height: 100%;
        background: rgb(255,255,255,0.5);
        transform: skewX(45deg) translateX(110px);
        transition: 0.5s;
    }

    &:hover::before{
        transform: skewX(45deg) translateX(-100px);
    }
`;

const NameText = styled.h3`
    color: white;
    padding: 0.5rem 2rem;
`;

export default Navbar