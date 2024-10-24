import { useState } from "react";
import { useSwiper } from "swiper/react";
import { answerStatus } from "../../utils";
import { alphabet } from "../../data/alphabet";
import { AnswerButton, AnswerInput, AnswerWrapper } from "./styled";
import toast, { Toaster } from "react-hot-toast";

type SlideNextButtonProps = {
  activeIndex: number;
  setActiveIndex(index: any): void;
  wordInfo: any;
};
export default function SlideNextButton({
  activeIndex,
  setActiveIndex,
  wordInfo,
}: SlideNextButtonProps) {
  const swiper = useSwiper();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAnswerSubmit = () => {
    setInputValue("");
    const correctAnswer = wordInfo?.word;
    let status = "";
    const activeLetter = alphabet[activeIndex]
    if (!inputValue) {
      status = answerStatus.passed;
    } else {
      if (!correctAnswer) {
        status = answerStatus.failed;
      }
      else {
        if (!inputValue.toLowerCase().startsWith(activeLetter.toLowerCase())) {
          toast.error(`Your answer should start with ${activeLetter}`);
          return;
        }
        if (inputValue.toLowerCase() === correctAnswer.toLowerCase()) {
          status = answerStatus.success;
        } else {
          status = answerStatus.failed;
        }
      }

    }

    const query = {
      ...wordInfo,
      letter: activeLetter,
      id: activeIndex,
      status,
    };
    storageAnswer(query);
    goToNextSlide();
  };

  const storageAnswer = (storagedAnswer: any) => {
    const storedAnswers = localStorage.getItem("answers");

    const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];

    const index = parsedAnswers.findIndex(
      (x: { word: any }) => x.word === storagedAnswer.word
    );
    if (index === -1) {
      const updatedAnswers = [...parsedAnswers, storagedAnswer];
      localStorage.setItem("answers", JSON.stringify(updatedAnswers));
    } else {
      parsedAnswers[index].status = storagedAnswer.status;
      localStorage.setItem("answers", JSON.stringify(parsedAnswers));
    }
  };

  const findNearestPassed = (currentIndex: number, array: any[]) => {
    let nearestIndex = null;
    let minDistance = Infinity;

    for (let i = 0; i < array.length; i++) {
      if (array[i].status === "passed" && array[i].id > currentIndex) {
        const distance = Math.abs(i - currentIndex);
        if (distance < minDistance) {
          nearestIndex = array[i].id;
          minDistance = distance;
        }
      }
    }

    return nearestIndex;
  };

  const goToNextSlide = () => {
    const storedAnswers = localStorage.getItem("answers");
    const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];

    const passedWords = parsedAnswers.filter(
      (x: { id: boolean; status: string }) => x.status === "passed"
    );
    const findNearestIndex = findNearestPassed(activeIndex, parsedAnswers);

    // Eğer isReturnPassedItems true ise, en yakın 'passed' elemanı bulup kaydırma yap
    if (localStorage.getItem("isReturnPassedItems") === "true") {
      const lastElementIndex = passedWords[passedWords.length - 1]?.id;
      const nextIndex =
        lastElementIndex !== findNearestIndex
          ? findNearestIndex
          : passedWords[0]?.id;
      if (nextIndex === null) {
        alert("oyun bitti");
        return;
      }
      swiper.slideTo(nextIndex || 0);
      setActiveIndex(nextIndex || 0);

      return;
    }

    if (activeIndex < alphabet.length - 1) {
      swiper?.slideNext();
      setActiveIndex((prevIndex: number) => prevIndex + 1);
    } else {
      const firstPassedIndex = passedWords[0]?.id;
      swiper?.slideTo(firstPassedIndex || 0);
      setActiveIndex(firstPassedIndex || 0);
      localStorage.setItem("isReturnPassedItems", "true");
    }
  };

  return (
    <AnswerWrapper>
      <AnswerInput value={inputValue} onChange={handleInputChange} placeholder="Type your answer here" />
      <AnswerButton
        onClick={handleAnswerSubmit}
        status={inputValue ? "send" : "passed"}
      >
        {inputValue ? "Send" : "Skip"}
      </AnswerButton>
      <Toaster position="top-left" reverseOrder={false} />
    </AnswerWrapper>
  );
}
