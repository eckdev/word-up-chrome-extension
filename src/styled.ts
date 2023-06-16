import styled from "styled-components";

export const Wrapper = styled.div`
  width: 400px;
  background: #fff;
  border: 12px solid #00125d;
  z-index: 999;
  font-family: Arial, sans-serif;
`;

export const Box = styled.div`
  padding: 56px 48px;
  position: relative;
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
  color: #00125d;
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
