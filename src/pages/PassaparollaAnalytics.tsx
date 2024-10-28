import React from "react";
import {
  AnalyticsContainer,
  Box,
  ButtonBox,
  Flex,
  LinkStyled,
  StatisticsAnswerWrapper,
  StatisticsItem,
  StatisticsPanel,
  StatisticsDetail,
  StatisticsTypo,
  VerticalSeperator,
  Wrapper,
} from "../styled";
import { answerStatus } from "../utils";

const PassaparollaAnalytics = () => {
  const storedAnswers = localStorage.getItem("answers");
  const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];

  const passedWords = parsedAnswers.filter(
    (x: { status: string }) => x.status === answerStatus.passed
  );
  const successWords = parsedAnswers.filter(
    (x: { status: string }) => x.status === answerStatus.success
  );
  const failedWords = parsedAnswers.filter(
    (x: { status: string }) => x.status === answerStatus.failed
  );
  return (
    <Wrapper>
      <AnalyticsContainer>
        <StatisticsPanel>
          <Flex>
            <Box>
              <StatisticsItem color="#7da388">
                {successWords.length ?? 0}
              </StatisticsItem>
              <StatisticsTypo>Success</StatisticsTypo>
            </Box>
            <VerticalSeperator />
            <Box>
              <StatisticsItem color="#d3af38">
                {passedWords.length ?? 0}
              </StatisticsItem>
              <StatisticsTypo>Passed</StatisticsTypo>
            </Box>
            <VerticalSeperator />
            <Box>
              <StatisticsItem color="#df585f">
                {failedWords.length ?? 0}
              </StatisticsItem>
              <StatisticsTypo>Failed</StatisticsTypo>
            </Box>
          </Flex>
        </StatisticsPanel>
        {parsedAnswers.length > 0 && (
          <>
            <h3 style={{ marginTop: "16px", marginBottom: "16px" }}>Answers</h3>
            <StatisticsPanel style={{ maxHeight: "300px", overflow: "auto" }}>
              {parsedAnswers.map((item: any, index: number) => (
                <div
                  style={{
                    borderBottom: "1px solid #b5b9c0",
                    marginBottom: "4px",
                  }}
                  key={index}
                >
                  <StatisticsAnswerWrapper>
                    <StatisticsItem color="#4f42d8">
                      {item?.letter}
                    </StatisticsItem>
                    <StatisticsTypo style={{ color: "#212121" }}>
                      {item?.word?.toUpperCase()}
                    </StatisticsTypo>
                  </StatisticsAnswerWrapper>
                  <div>
                    <StatisticsDetail>
                      <b>Question</b>:{" "}
                      {item?.meanings?.find(
                        (x: any) =>
                          x.partOfSpeech === "verb" ||
                          x.partOfSpeech === "noun" ||
                          x.partOfSpeech === "adjective"
                      )?.definitions[0].definition ?? "-"}
                    </StatisticsDetail>
                    <StatisticsDetail>
                      <b>Your Answer</b>: {item?.yourAnswer ?? "-"}
                    </StatisticsDetail>
                  </div>
                </div>
              ))}
            </StatisticsPanel>
          </>
        )}
        <ButtonBox
          style={{ padding: 0, marginTop: "50px", textAlign: "center" }}
        >
          <LinkStyled to="/">Go To Home</LinkStyled>
        </ButtonBox>
      </AnalyticsContainer>
    </Wrapper>
  );
};

export default PassaparollaAnalytics;
