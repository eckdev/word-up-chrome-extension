/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { AlphabetSlideWrapper } from "./styled";
import { useSwiperSlide } from "swiper/react";
import { alphabet } from "../../data/alphabet";

type AlphabetSlideProps = {
  label: string;
  status?: "active" | "passive" | "success" | "failed";
  setWordInfo(word: any): void;
  activeIndex: number;
  isReturnPassedItems?: boolean;
  setIsLoading(loading:boolean): void
};

const AlphabetSlideItem = ({
  label,
  status,
  activeIndex,
  isReturnPassedItems,
  setWordInfo,
  setIsLoading
}: AlphabetSlideProps) => {
  const swiperSlide = useSwiperSlide();
  const getNewWord = useCallback(() => {
    import(`../../data/beginner.json`)
      .then((res) => {
        const data: string[] = res.Words;
        const wordsStartingWithLabel = data.filter((word) =>
          word.toLowerCase().startsWith(label.toLowerCase())
        );
        const randomWord =
          wordsStartingWithLabel[
            Math.floor(Math.random() * wordsStartingWithLabel.length)
          ];
        getWord(randomWord);
      })
      .catch((_) => null);
  }, [label]);

  const getWord = async (word: string) => {
    try {
      setIsLoading(true);
      const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      ).then((res) => res.json());

      setWordInfo(result[0]);
    } catch (error) {
      setWordInfo({});
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isReturnPassedItems) {
      const storedAnswers = localStorage.getItem("answers");
      const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];

      const word = parsedAnswers.find(
        (x: { id: number }) => x.id === activeIndex
      );
      setWordInfo(word);
    }

    if (!isReturnPassedItems) {
      const labelIndex = alphabet.findIndex((x) => x === label);
      if (labelIndex === activeIndex) {
        getNewWord();
      }
    }
  }, [activeIndex, getNewWord, label, isReturnPassedItems]);

  return (
    <>
      <AlphabetSlideWrapper
        status={swiperSlide.isActive ? "active" : status ? status : "passive"}
      >
        {label}
      </AlphabetSlideWrapper>
    </>
  );
};

export default AlphabetSlideItem;
