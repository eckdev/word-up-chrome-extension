import { useEffect, useState } from "react";
import {
  AnalyticsContainer,
  Box,
  Flex,
  StatisticsPanel,
  StatisticsItem,
  StatisticsTypo,
  VerticalSeperator,
  Wrapper,
  ChartWrapper,
  ButtonBox,
  LinkStyled,
} from "../styled";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const Analytics = () => {
  const [misrememberedWordsLenght, setMisrememberedWordsLenght] = useState(0);
  const [rememberedWordsLenght, setRememberedWordsLenght] = useState(0);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    debugger
    const storedMisrememberedWords = localStorage.getItem("misrememberedWords");
    const storedRememberedWords = localStorage.getItem("rememberedWords");

    const parsedMisrememberedWords = storedMisrememberedWords
      ? JSON.parse(storedMisrememberedWords)
      : [];

    const parsedRememberedWords = storedRememberedWords
      ? JSON.parse(storedRememberedWords)
      : [];

    const mrwData = getData(parsedMisrememberedWords, "misrememberedWords");
    const rwData = getData(parsedRememberedWords, "rememberedWords");

    const result: any = mergeArraysAsObjects(mrwData, rwData);
    setChartData(result);
    setRememberedWordsLenght(parsedRememberedWords?.length);
    setMisrememberedWordsLenght(parsedMisrememberedWords?.length);
  }, []);

  const getData = (data: any, objectName: string) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const groupedData: any = {};

    const daysInWeek = 7;
    const currentDate = new Date(oneWeekAgo);
    for (let i = 0; i <= daysInWeek; i++) {
      const dateString = currentDate.toISOString().slice(0, 10);
      groupedData[dateString] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const item of data) {
      const date = new Date(item.date);
      if (date >= oneWeekAgo) {
        const dateString = date.toISOString().slice(0, 10);
        if (groupedData[dateString] !== undefined) {
          groupedData[dateString]++;
        } else {
          groupedData[dateString] = 1;
        }
      }
    }

    const result = [];
    for (const date in groupedData) {
      result.push({ name: date, [objectName]: groupedData[date] });
    }

    return result;
  };

  const mergeArraysAsObjects = (mrwArray: any, rwArray: any) => {
    const mergedArray = [];

    for (let i = 0; i < mrwArray.length; i++) {
      const mergedItem = {
        name: mrwArray[i].name,
        learning: mrwArray[i].misrememberedWords,
        mastered: rwArray[i].rememberedWords,
      };
      mergedArray.push(mergedItem);
    }

    return mergedArray;
  };

  return (
    <Wrapper>
      <AnalyticsContainer>
        <h3>Analytics</h3>
        <StatisticsPanel>
          <Flex>
            <Box>
              <StatisticsItem color="#4F42D8">
                {misrememberedWordsLenght ?? 0}
              </StatisticsItem>
              <StatisticsTypo>Learning</StatisticsTypo>
            </Box>
            <VerticalSeperator />
            <Box>
              <StatisticsItem color="#47C690">
                {rememberedWordsLenght}
              </StatisticsItem>
              <StatisticsTypo>Mastered</StatisticsTypo>
            </Box>
          </Flex>
        </StatisticsPanel>
        <StatisticsPanel style={{ paddingBottom: 36 }}>
          <ChartWrapper>
            <h3>Week</h3>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f42d8" stopOpacity={0} />
                    <stop offset="65%" stopColor="#4f42d8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4f42d8" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#F8F9F9" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="learning" barSize={20} fill="url(#colorUv)" />
                <Line type="monotone" dataKey="mastered" stroke="#4f42d8" />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </StatisticsPanel>
        <ButtonBox
          style={{ padding: 0, marginTop: "50px", textAlign: "center" }}
        >
          <LinkStyled to="/">Go To Home</LinkStyled>
        </ButtonBox>
      </AnalyticsContainer>
    </Wrapper>
  );
};

export default Analytics;
