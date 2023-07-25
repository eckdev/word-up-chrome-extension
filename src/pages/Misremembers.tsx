import React, { useEffect, useState } from "react";
import {
  DateStyled,
  Pronounciation,
  Word,
  PhoneticAudio,
  Phonetic,
  PosBlocks,
  Pos,
  Definition,
  WordBox,
  ButtonBox,
  Flex,
  Button,
  Wrapper,
  LinkStyled,
  NoWordWrapper,
  NoWordText,
} from "../styled";
import { getFormattedDate } from "../utils";
import WordInfo from "../types";
import { Stack } from "../components/Icons/Stack";
import { Like } from "../components/Icons/Like";

interface MisrememberProps {
  id: string;
  date: Date;
  word: WordInfo;
}

const Misremembers = () => {
  const [wordInfo, setword] = useState<MisrememberProps | null>(null);
  const [index, setIndex] = useState(0);
  const [dataLength, setDataLength] = useState(0);

  const getMisrememberedWords = () => {
    const storedMisrememberedWords = localStorage.getItem("misrememberedWords");

    const parsedMisrememberedWords = storedMisrememberedWords
      ? JSON.parse(storedMisrememberedWords)
      : [];

    return parsedMisrememberedWords;
  };

  const getRememberedWords = () => {
    const storedRememberedWords = localStorage.getItem("rememberedWords");

    const parsedRememberedWords = storedRememberedWords
      ? JSON.parse(storedRememberedWords)
      : [];

    return parsedRememberedWords;
  };

  useEffect(() => {
    const words = getMisrememberedWords();
    console.log(words);

    setDataLength(words.length);
    setword(words[index]);
  }, [index]);

  const playAudio = () => {
    const audio = new Audio(wordInfo?.word?.phonetics[0]?.audio);
    if (wordInfo?.word?.phonetics[0]?.audio) {
      audio.play();
    }
  };

  const removeWord = (wordInfo: MisrememberProps) => {
    debugger
    const words = getMisrememberedWords();
    const rememberedWords = getRememberedWords();
    const arr = words.filter((x: { id: string }) => x.id !== wordInfo.id);
    localStorage.setItem("misrememberedWords", JSON.stringify(arr));
    const updatedRememberedWords = [...rememberedWords, wordInfo];
    localStorage.setItem(
      "rememberedWords",
      JSON.stringify(updatedRememberedWords)
    );
    increaseIndex();
  };

  const increaseIndex = () => {
    if (index < dataLength - 1) {
      setIndex(index + 1);
    } else if (index === dataLength - 1) {
      const words = getMisrememberedWords();
      if (words.length) {
        setIndex(0);
      }
      else {
        setword(null)
      }
    }
  };

  return (
    <Wrapper>
      {wordInfo?.word && (
        <>
          <WordBox style={{ background: "#f8f9f9" }}>
            <DateStyled>{getFormattedDate(wordInfo?.date as Date)}</DateStyled>
            <Word>{wordInfo?.word?.word}</Word>
            <Pronounciation>
              <Phonetic>{wordInfo?.word?.phonetic}</Phonetic>
              <PhoneticAudio onClick={playAudio} />
            </Pronounciation>
            {wordInfo?.word?.meanings &&
              wordInfo?.word?.meanings.map((item, index) => (
                <PosBlocks key={index}>
                  <Pos>{item.partOfSpeech}</Pos>
                  {item.definitions.slice(0, 3).map((def, index) => (
                    <Definition key={index}>{def.definition}</Definition>
                  ))}
                </PosBlocks>
              ))}
          </WordBox>
          <ButtonBox>
            <Flex>
              <Button title="Misremember" onClick={increaseIndex}>
                <Stack />
              </Button>
              <Button
                title="Remember"
                onClick={() => removeWord(wordInfo as MisrememberProps)}
              >
                <Like />
              </Button>
            </Flex>
          </ButtonBox>
          <ButtonBox style={{ marginTop: "-20px", textAlign: "center"}}>
            <LinkStyled to="/">Go To Home</LinkStyled>
          </ButtonBox>
        </>
      )}
      {
        !wordInfo?.word && 
       <NoWordWrapper>
        <NoWordText>There is no word you cannot remember!</NoWordText>
        <ButtonBox style={{ marginTop: "20px", textAlign: "center",paddingBottom: 0 }}>
            <LinkStyled to="/">Go To Home</LinkStyled>
          </ButtonBox>
       </NoWordWrapper>
      }
    </Wrapper>
  );
};

export default Misremembers;
