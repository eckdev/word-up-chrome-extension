import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import SlideNextButton from "../components/Passaparola/SlideNextButton";
import { Wrapper } from "../styled";
import AlphabetSlideItem from "../components/Passaparola/AlphabetSlide";
import { alphabet } from "../data/alphabet";
import {
  CountdownText,
  CountdownWrapper,
  Question,
  QuestionWrapper,
} from "../components/Passaparola/styled";
import { Back } from "../components/Icons/Back";
import { useNavigate } from "react-router-dom";
import QuestionLoading from "../components/Passaparola/Loading";
import { Count } from "../components/Icons/Count";

type Props = {};

const Passaparola = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordInfo, setWordInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      navigate('/panalytics')
      return;
    };
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navigate, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const storedAnswers = localStorage.getItem("answers");
  const isReturnPassedItems = localStorage.getItem("isReturnPassedItems");
  const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];



  const getQuestion = () => {
    return (
      wordInfo?.meanings?.find(
        (x: any) =>
          x.partOfSpeech === "verb" ||
          x.partOfSpeech === "noun" ||
          x.partOfSpeech === "adjective"
      )?.definitions[0].definition ?? "-"
    );
  };

  return (
    <Wrapper>
      <div
        style={{ paddingLeft: "16px", paddingTop: "16px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Back />
      </div>
      <Swiper
        slidesPerView={4}
        allowTouchMove={false}
        centeredSlides={true}
        loop={false}
        pagination={{ clickable: false }}
        scrollbar={{ draggable: false }}
        style={{ height: "500px", padding: "16px" }}
      >
        {!isReturnPassedItems &&
          alphabet.map((item, index) => {
            const status = parsedAnswers.find(
              (x: { id: number }) => x.id === index
            )?.status;
            return (
              <SwiperSlide key={index}>
                <AlphabetSlideItem
                  label={item}
                  status={status}
                  setWordInfo={setWordInfo}
                  activeIndex={activeIndex}
                  setIsLoading={setIsLoading}
                />
              </SwiperSlide>
            );
          })}

        {isReturnPassedItems === "true" &&
          parsedAnswers.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <AlphabetSlideItem
                  label={item.letter}
                  status={item.status}
                  setWordInfo={setWordInfo}
                  activeIndex={activeIndex}
                  isReturnPassedItems={isReturnPassedItems === "true"}
                  setIsLoading={setIsLoading}
                />
              </SwiperSlide>
            );
          })}

        <div style={{ position: "absolute", bottom: "16px", zIndex: 999 }}>
          <SlideNextButton
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            wordInfo={wordInfo}
          />
        </div>
      </Swiper>
      <QuestionWrapper>
        <CountdownWrapper>
          <Count />{" "}
          <CountdownText>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </CountdownText>
        </CountdownWrapper>
        {isLoading ? (
          <QuestionLoading />
        ) : (
          <Question> {getQuestion()}</Question>
        )}
      </QuestionWrapper>
    </Wrapper>
  );
};

export default Passaparola;
