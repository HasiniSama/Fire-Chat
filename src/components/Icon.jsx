import styled from "styled-components"

export default function Icon({ color, children }) {
  return <StyledIcon background={color}>{children}</StyledIcon>
}

const StyledIcon = styled.div`
  height:auto;
  width: auto;
  display: inline-block;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  margin: 0 0.5rem ;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`