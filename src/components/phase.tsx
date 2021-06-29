import React, { useContext } from "react";
import { Task } from "./task";
import { TaskSamples } from "../types";
import { isPhaseCompleted } from "./utils";
import styled from "styled-components";
import { Done } from "./done";
import { LayoutActionsContext } from "../app";

type PhaseProps = {
  id: string;
  title: string;
  order: number;
  tasks: TaskSamples;
  isDisabled: boolean;
};

export const Phase: React.FC<PhaseProps> = (props) => {
  const { title, order, tasks, id: phaseId, isDisabled } = props;
  const { refresh, updateStore } = useContext(LayoutActionsContext);

  const handleCompletedChange = (
    taskId: string,
    phaseId: string,
    isCompleted: boolean
  ) => {
    updateStore(taskId, phaseId, isCompleted);
    refresh();
  };

  return (
    <>
      <StyledWrapper isDisabled={isDisabled}>
        <StyledOrder isDisabled={isDisabled}>{order}</StyledOrder>
        <StyledTitle>{title}</StyledTitle>
        {isPhaseCompleted(tasks) && (
          <StyledDone>
            <Done isDisabled={isDisabled} />
          </StyledDone>
        )}
      </StyledWrapper>
      <div>
        {Object.entries(tasks).map(([taskId, { title, isCompleted }]) => {
          return (
            <Task
              key={`${phaseId}_${taskId}`}
              id={taskId}
              phaseId={phaseId}
              title={title}
              isCompleted={isCompleted}
              onCompletedChange={handleCompletedChange}
              isDisabled={isDisabled}
            />
          );
        })}
      </div>
    </>
  );
};

const StyledWrapper = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.color.grey : theme.color.black};
`;

const StyledTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize["large"]};
  font-weight: bold;
`;

const StyledOrder = styled.div<{ isDisabled?: boolean }>`
  width: ${(props) => props.theme.fontSize["xl"]};
  height: ${(props) => props.theme.fontSize["xl"]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ isDisabled, theme }) =>
    isDisabled ? theme.color.grey : theme.color.black};
  color: ${(props) => props.theme.color["white"]};
  margin-right: ${(props) => `${props.theme.offset["1"]} `};
`;

const StyledDone = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
