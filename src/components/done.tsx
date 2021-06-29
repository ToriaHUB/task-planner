import React from "react";
import styled from "styled-components";

type DoneProps = {
  isDisabled?: boolean;
};

export const Done: React.FC<DoneProps> = ({ isDisabled }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="48px"
      height="48px"
    >
      <StyledPath
        isDisabled={isDisabled}
        d="M40.6 12.1L17 35.7 7.4 26.1 4.6 29 17 41.3 43.4 14.9z"
      />
    </svg>
  );
};

const StyledPath = styled.path<{ isDisabled?: boolean }>`
  fill: ${({ isDisabled, theme }) =>
    isDisabled ? theme.color.grey : theme.color.green};
`;
