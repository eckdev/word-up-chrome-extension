import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import SlideNextButton from "../components/Passaparola/SlideNextButton";
import { Wrapper } from "../styled";
import AlphabetSlideItem from "../components/Passaparola/AlphabetSlide";
import { alphabet } from "../data/alphabet";
import { Question, QuestionWrapper } from "../components/Passaparola/styled";

type Props = {};

const Passaparola = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wordInfo, setWordInfo] = useState<any>({});
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
      )?.definitions[0].definition ??
      "Opps! Something went wrong. Please try again"
    );
  };

  return (
    <Wrapper>
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
                />
              </SwiperSlide>
            );
          })}

        <div style={{ position: "absolute", bottom: '16px', zIndex: 999 }}>
          <SlideNextButton
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            wordInfo={wordInfo}
          />
        </div>
      </Swiper>
      <QuestionWrapper>
        <Question> {getQuestion()}</Question>
      </QuestionWrapper>
    </Wrapper>
  );
};

export default Passaparola;
