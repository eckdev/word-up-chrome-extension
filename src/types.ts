interface Definition {
    definition: string;
  }
  
  interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
  }
  
  interface Phonetic {
    audio: string;
  }
  
  interface WordInfo {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
  }

  export default WordInfo;