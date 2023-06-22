import styled from "styled-components";

const mainColor = "#4F42D8";

export const Wrapper = styled.div`
  width: 400px;
  background: #fff;
  border: 12px solid ${mainColor};
  z-index: 999;
  font-family: Arial, sans-serif;
`;

export const WordBox = styled.div`
  padding: 56px 48px;
  position: relative;
  background: '#F8F9F9;
`;
export const ButtonBox = styled.div`
  padding: 0px 48px 56px 48px;
  position: relative;
  margin-top: -30px;
`;

export const DateStyled = styled.div`
  margin-bottom: 16px;
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Word = styled.h1`
  display: inline-block;
  font-size: 48px;
  font-weight: 700;
  white-space: nowrap;
  color: ${mainColor};
  margin-top: 0;
  margin-bottom: 8px;
`;

export const Pronounciation = styled.div`
  position: relative;
  padding-bottom: 18px;
  margin-bottom: 10px;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 38px;
    border-bottom: 4px solid #d8d8d8;
  }
`;

export const Phonetic = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

export const PhoneticAudio = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 24px;
  height: 24px;
  margin: 0 !important;
  background: url("https://www.dictionary.com/e/wp-content/themes/dictionary-com/images/ic_volume_up.png")
    no-repeat 0 0;
  background-size: contain;
  cursor: pointer;
`;

export const PosBlocks = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;

export const Pos = styled.span`
  display: inline-block;
  font-style: italic;
  margin-bottom: 8px;
  line-height: 1.1;
`;

export const Definition = styled.span`
  display: inline-block;
  margin-bottom: 4px;
  line-height: 20px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Button = styled.button`
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
  border: none;
  cursor: pointer;
  background: #fff;
`;
