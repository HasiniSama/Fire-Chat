import styled from "styled-components";

export default function Button({ content, children }) {
  return <StyledButton>{children}{content}</StyledButton>;
}

const StyledButton = styled.button`
  border: double 3px transparent;
  /* border-image: linear-gradient(to right, #09FBD3 0%, #FE53BB 79%); */
  background-image: linear-gradient(#000328, #000328), 
                    linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 65%;
  height: 3rem;
  color: white;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  margin-top: 1.5rem;

  &:hover{
    /* background-image: linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%), 
                    linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%);
    color: #000328; */
    transform: scale(1.05);
  }

`;

// const Ripple = styled.span`
//   position: absolute; 
//   border-radius: 50%;
//   transform: scale(0);
//   animation: ripple 600ms linear;
//   background-color: rgba(255, 255, 255, 0.7);

//   @keyframes ripple {
//     to {
//       transform: scale(4);
//       opacity: 0;
//     }
//   }
// `;