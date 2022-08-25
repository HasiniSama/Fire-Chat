import styled from "styled-components";

export default function Button({ content, children }) {
  return <StyledButton>{children}{content}</StyledButton>;
}

export function ShortButton({ content, children }) {
  return <ShortStyledButton>{children}{content}</ShortStyledButton>;
}

const StyledButton = styled.button`
  border: double 3px transparent;
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
  transition: 0.5s;
  margin-top: 1.5rem;
  overflow: hidden;
  position: relative;
  
  &:hover{
    transform: scale(1.05);
  }

  &::before{
      content: '';
      position: absolute;
      width: 25px;
      height: 100%;
      background: rgb(255,255,255,0.5);
      transform: skewX(45deg) translateX(160px) translateZ(100px);
      transition: 0.5s;
  }

  &:hover::before{
      transform: skewX(45deg) translateX(-160px);
  }
`
const ShortStyledButton = styled(StyledButton)`
    height: 2.5rem !important;
`