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
} from "./styled";
import { generate } from "random-words";
import WordInfo from "./types";
import { Like } from "./components/Icons/Like";
import { Unlike } from "./components/Icons/Unlike";
import Loading from "./components/Loading";
import { getFormattedDate } from "./utils";

function App() {
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const getNewWord = useCallback(() => {
    const word = generate();
    getWord(word);
  },[])

  useEffect(() => {
    setIsLoading(true);
    getNewWord();
  }, [getNewWord]);
  
  const getWord = async (word: string[]) => {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    )
      .then((res) => res.json())
      .catch(() => { getNewWord()})
      .finally(() => setIsLoading(false));
    setWordInfo(result[0]);
  };

  const playAudio = () => {
    const audio = new Audio(wordInfo?.phonetics[0]?.audio);
    if (wordInfo?.phonetics[0]?.audio) {
      audio.play();
    }
  };

  const saveMisrememberedWord = (wordInfo: any) => {
    const storedMisrememberedWords = localStorage.getItem("misrememberedWords");

    const parsedMisrememberedWords = storedMisrememberedWords
      ? JSON.parse(storedMisrememberedWords)
      : [];

      const rw = {
        word: wordInfo,
        date: new Date(),
        id: Math.random().toString(16).slice(2)
      }
    const updatedMisrememberedWords = [...parsedMisrememberedWords, rw];

    localStorage.setItem(
      "misrememberedWords",
      JSON.stringify(updatedMisrememberedWords)
    );
      getNewWord();
  };

  const rememberedWord = () => {
    getNewWord();
  }

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
          <ButtonBox style={{ marginTop: "-40px" }}>
            <Flex>
              <Button
                title="Misremember"
                onClick={() => saveMisrememberedWord(wordInfo)}
              >
                <Unlike />
              </Button>
              <Button
                title="Remember"
                onClick={rememberedWord}
              >
                <Like />
              </Button>
            </Flex>
          </ButtonBox>
        </>
      )}
    </Wrapper>
  );
}

export default App;