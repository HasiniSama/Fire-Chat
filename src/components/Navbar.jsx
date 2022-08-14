import React from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <NavContainer>
        <NameText>Fire Chat</NameText>
        {/* <NavLink to="/signin" 
            style={(state) => ({
                display: state.isActive ? 'none' : 'block',
            })}>
            <NavText>Sign In</NavText>
        </NavLink>
        <NavLink to="/signup" style={(state) => 
            ({
                display: state.isActive ? 'none' : 'block',
            })}>
            <NavText>Sign Up</NavText>
        </NavLink> */}
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

const NavText = styled.h3`
    color : var(--color-2);
    text-decoration: none; 
    box-shadow: 20px 20px 50px 0 rgb(0,0,0,0.5);
    padding: 0.5rem 2rem;
    border-radius: 20px;
    border: 1px solid rgb(255,255,255,0.3);
    border-right: 0;
    border-bottom: 0;
    transition: 0.3s ease-in-out all;

    &:hover{
    transform: scale(1.05);
    }
`;

const NameText = styled.h3`
    /* background-image: linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%); */
    color: white;
    padding: 0.5rem 2rem;
`;

// const NavItems = styled.div`
//     margin-top: 0 !important; 
// `;
export default Navbar