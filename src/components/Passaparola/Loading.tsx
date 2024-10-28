import Skeleton from "react-loading-skeleton";

const QuestionLoading = () => {
  return (
    <>
          <Skeleton width={300} height={20} style={{ marginBottom: 4 }} />
          <Skeleton width={300} height={20} />
    </>

  );
};

export default QuestionLoading;