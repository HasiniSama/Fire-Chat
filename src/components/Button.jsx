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

  &:hover{
    background-image: linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%), 
                    linear-gradient(30deg, #09FBD3 0%, #FE53BB 79%);
    transition: 0.5s;
    color: #000328;
  }

  @media only screen and (min-width: 1280px) {
    margin-top: 1.5rem;
  }
`;