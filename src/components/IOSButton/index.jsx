import styled from "styled-components";

const IOSButton = ({name, option, active, setVal}) => {
  return (
      <Button className="panelItem">
        <input name={name} type="radio" id={option} hidden={true} defaultChecked={option === active} onClick={() => setVal(option)}/>
        <Span>{option}</Span>
      </Button>
  )
}

const Span = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.label`
  display: block;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  & input + Span::before {
    position: absolute;
    content: "";
    right: 0;
    top: 4px;
    width: 60px;
    height: 30px;
    border-radius: 20px;
    background-color: #ccc;
    transition: all 0.3s ease-in-out;
  }
  & input + Span::after {
    position: absolute;
    content: "";
    right: 2px;
    top: 6px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: black;
    transform: translateX(-30px);
    transition: all 0.3s ease-in-out;
  }
  & input:checked + Span::before {
    background-color: black;
  }
  & input:checked + Span::after {
    transform: translateX(0px);
    background-color: #FF0101;
  }
`
export default IOSButton;
