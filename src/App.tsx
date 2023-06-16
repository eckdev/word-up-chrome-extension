import { useEffect, useState } from "react";
import {
  Box,
  DateStyled,
  Pronounciation,
  Word,
  Wrapper,
  PhoneticAudio,
  Phonetic,
  PosBlocks,
  Pos,
  Definition,
} from "./styled";
import { generate } from "random-words";
import WordInfo from "./types";

function App() {
  const [wordInfo, setWordInfo] = useState<WordInfo | null>(null);
  useEffect(() => {
    const word = generate();
    getWord(word);
  }, []);

  const getWord = async (word: string[]) => {
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    ).then((res) => res.json());
    setWordInfo(result[0]);
  };

  const playAudio = () => {
    const audio = new Audio(wordInfo?.phonetics[0]?.audio);
    if (wordInfo?.phonetics[0]?.audio) {
      audio.play();
    }
  };

  const getFormattedDate = () => {
    const date = new Date(); // Geçerli tarih ve saat
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);
    return formattedDate;
  };

  return (
    <Wrapper>
      <Box>
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
              {item.definitions.slice(0, 3).map((def,index) => (
                <Definition key={index}>{def.definition}</Definition>
              ))}
            </PosBlocks>
          ))}
      </Box>
    </Wrapper>
  );
}

export default App;
