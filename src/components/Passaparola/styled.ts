import styled from "styled-components";

const mainColor = "#4F42D8";

interface StatusProps {
  status: "active" | "passive" | "success" | "failed" | "passed";
}
export const AlphabetSlideWrapper = styled.div<StatusProps>`
  border-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  
  width: 56px;
  height: 56px;
  border-radius: 999px;
  font-weight: 600;
  color: ${(props) => {
    switch (props.status) {
      case "passive":
        return "#9e9e9e";
      case "success":
      case "failed":
      case "passed":
        return "#fff";
      default:
        return "#111"; // default color
    }
  }};
  background-color: ${(props) => {
    switch (props.status) {
      case "success":
        return "#7da388";
      case "failed":
        return "#df585f";
      case "passed":
        return "#d3af38";
      default:
        return "transparent";
    }
  }};
  border-color: ${(props) => {
    switch (props.status) {
      case "passive":
        return "#ededed";
      case "success":
      case "failed":
      case "passed":
        return "transparent";
      default:
        return "#212121";
    }
  }};
    border-width: 4px;
  box-shadow: 0 4px
    ${(props) => (props.status === "active" ? mainColor : "transparent")};
`;

export const CountdownWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`

export const CountdownText = styled.div`
    color: #444;
    font-size: 20px;
    line-height: 20px;
    margin-left: 8px;
`

export const QuestionWrapper = styled.div`
    position: absolute;
    top: 24%;
    width: 380px;
    padding: 16px 10px;
    font-size: 28px;
`
export const Question = styled.div`
  font-weight: 700;
  color: #111;
  max-height: 200px;
  overflow: auto;
  position: relative;
  z-index:9999;
`

export const AnswerWrapper = styled.div`
    height: 54px;
    width: 360px;
    display: flex;
    background: #fff;
    border-radius: 16px;
    align-items: center;
    border: 2px solid #4f42d8;
`

export const AnswerInput = styled.input`
    background-color: #fff;
    border: 0;
    color: #444;
    font-size: 18px;
    font-weight: 700;
    height: 54px;
    outline: none !important;
    -webkit-text-decoration: none !important;
    text-decoration: none !important;
    padding: 0 16px;
    width: 100%;
    border-radius: 16px;
      font-family: Lexend, sans-serif !important;
    &::placeholder {
      font-size: 14px;
      font-weight: 400;
    }
`

interface ButtonProps {
  status: "send" | "passed";
}
export const AnswerButton = styled.button<ButtonProps>`
    border-radius: 16px;
    cursor: pointer;
    height: 38px;
    width: 100px;
    font-size: 14px;
    padding: 0 14px;
    outline: none !important;
    -webkit-text-decoration: none !important;
    text-decoration: none !important;
    display: inline-block;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ebedf0;
    color: #323233;
    margin-right: 16px;
      font-family: Lexend, sans-serif !important;
    ${(props) => {
      switch (props.status) {
        case "send":
          return `
            background-color: #ff7878;
            border-color: #ff7878;
            color: #fff;
          `
        case "passed":
          return `
            background-color: #d3af38;
            border-color: #d3af38;
            color: #fff;
          `
        default:
          return "transparent";
      }
    }}
`