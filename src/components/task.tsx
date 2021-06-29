import React from "react";
import styled from "styled-components";

type TaskProps = {
  id: string;
  phaseId: string;
  title: string;
  isCompleted: boolean;
  onCompletedChange: (
    taskId: string,
    phaseId: string,
    isCompleted: boolean
  ) => void;
  isDisabled?: boolean;
};

export const Task: React.FC<TaskProps> = (props) => {
  const { id, phaseId, title, onCompletedChange, isCompleted, isDisabled } =
    props;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    onCompletedChange(id, phaseId, event.target.checked);

  return (
    <StyledWrapper>
      <StyledInput
        id="task"
        type="checkbox"
        checked={isCompleted}
        onChange={onChangeHandler}
        disabled={isDisabled}
      />
      <StyledLabel htmlFor="task" isDisabled={isDisabled}>
        {title}
      </StyledLabel>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  padding: ${(props) => `${props.theme.offset["0.5"]} 0`};
`;

const StyledInput = styled.input`
  margin-right: ${(props) => props.theme.offset["0.5"]};
`;
const StyledLabel = styled.label<{ isDisabled?: boolean }>`
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.color.grey : theme.color.black};
`;
