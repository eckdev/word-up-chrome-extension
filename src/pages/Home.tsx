import {
  Box,
  GameModePanel,
  GameModeText,
  Logo,
  StatisticsPanel,
  WordBox,
  Wrapper,
} from "../styled";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <WordBox
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Logo>W.</Logo>

        <GameModePanel
          onClick={() => navigate("/words")}
        >
          <Box>
            <GameModeText>STORY</GameModeText>
          </Box>
        </GameModePanel>
        <GameModePanel
          onClick={() => {
            localStorage.removeItem("answers");
            localStorage.removeItem("isReturnPassedItems");
            navigate("/passaparola");
          }}
        >
          <Box>
            <GameModeText>WORD GUESSR</GameModeText>
          </Box>
        </GameModePanel>
      </WordBox>
    </Wrapper>
  );
};

export default Home;
