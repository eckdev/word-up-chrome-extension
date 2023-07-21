import { useEffect, useState, useCallback } from "react";
import {
  DateStyled,
  Pronounciation,
  Word,
  Wrapper,
  PhoneticAudio,
  Phonetic,
  PosBlocks,
  Pos,
  Definition,
  Flex,
  Button,
  WordBox,
  ButtonBox,
  LinkStyled,
} from "../styled";
import { generate } from "random-words";
import WordInfo from "../types";
import { Like } from "../components/Icons/Like";
import Loading from "../components/Loading";
import { getFormattedDate } from "../utils";
import { Stack } from "../components/Icons/Stack";

function Home() {
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getNewWord = useCallback(() => {
    const word = generate();
    getWord(word);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getNewWord();
  }, [getNewWord]);

  const getWord = async (word: string[]) => {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
      .then((res) => res.json())
      .catch(() => {
        getNewWord();
      })
      .finally(() => setIsLoading(false));
    setWordInfo(result[0]);
  };

  const playAudio = () => {
    const audio = new Audio(wordInfo?.phonetics[0]?.audio);
    if (wordInfo?.phonetics[0]?.audio) {
      audio.play();
    }
  };

  const storageWord = (name: string, wordInfo: any) => {
    const storedMisrememberedWords = localStorage.getItem(name);

    const parsedMisrememberedWords = storedMisrememberedWords
      ? JSON.parse(storedMisrememberedWords)
      : [];

    const rw = {
      word: wordInfo,
      date: new Date(),
      id: Math.random().toString(16).slice(2),
    };
    const updatedMisrememberedWords = [...parsedMisrememberedWords, rw];

    localStorage.setItem(name, JSON.stringify(updatedMisrememberedWords));
    getNewWord();
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <WordBox style={{ background: "#f8f9f9" }}>
            <DateStyled>{getFormattedDate()}</DateStyled>
            <Word>{wordInfo?.word}</Word>
            <Pronounciation>
              <Phonetic>{wordInfo?.phonetic}</Phonetic>
              <PhoneticAudio onClick={playAudio} />
            </Pronounciation>
            {wordInfo?.meanings &&
              wordInfo?.meanings.map((item, index) => (
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
              <Button
                title="Misremember"
                onClick={() => storageWord("misrememberedWords", wordInfo)}
              >
                <Stack />
              </Button>
              <Button
                title="Remember"
                onClick={() => storageWord("rememberedWords", wordInfo)}
              >
                <Like />
              </Button>
            </Flex>
          </ButtonBox>
          <ButtonBox style={{ marginTop: "-20px", textAlign: "center" }}>
            <LinkStyled to="/analytics">Go To Analytics</LinkStyled>
          </ButtonBox>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
