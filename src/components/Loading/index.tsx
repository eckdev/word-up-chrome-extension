"use client"
import Skeleton from "react-loading-skeleton";
import { LoadingWrapper } from "./styled";

const Loading = () => {
  return (
    <LoadingWrapper>
      <Skeleton width={200} height={17} style={{ marginBottom: 16 }} />
      <Skeleton width={300} height={55} style={{ marginBottom: 16 }} />
      <Skeleton
        width={200}
        height={17}
        style={{ marginBottom: 16 }}
        count={2}
      />
    </LoadingWrapper>
  );
};

export default Loading;
