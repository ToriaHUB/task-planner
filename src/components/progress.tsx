import React, { useEffect, useState } from "react";
import { PhaseSamples, RandomResource } from "../types";
import { Phase } from "./phase";
import {
  getFirstIncompletePhaseOrder,
  isPhaseDisabled,
  isProgressCompleted,
} from "./utils";
import styled from "styled-components";
import axios from "axios";
import { RandomMessage } from "./random-message";

type ProgressProps = {
  title: string;
  phases: PhaseSamples;
};

export const Progress: React.FC<ProgressProps> = (props) => {
  const { title, phases } = props;
  const [isCompleted, setIsCompleted] = useState(() =>
    isProgressCompleted(phases)
  );

  const [randomResource, setRandomResource] = useState<RandomResource>();

  useEffect(() => {
    if (isCompleted) {
      axios
        .get<RandomResource>("https://uselessfacts.jsph.pl/random.json")
        .then((response) => {
          setRandomResource(response.data);
        });
    } else {
      setRandomResource(undefined);
    }
  }, [isCompleted]);

  useEffect(() => {
    const nextIsCompleted = isProgressCompleted(phases);
    setIsCompleted((prevIsCompleted) =>
      prevIsCompleted === nextIsCompleted ? prevIsCompleted : nextIsCompleted
    );
  }, [phases]);

  const firstIncompletePhaseOrder = getFirstIncompletePhaseOrder(phases);

  return (
    <StyledBackground>
      <StyledProgress>
        <StyledTitle>{title}</StyledTitle>
        <div>
          {Object.entries(phases).map(([phaseId, { title, tasks, order }]) => (
            <Phase
              key={phaseId}
              id={phaseId}
              title={title}
              order={order}
              tasks={tasks}
              isDisabled={isPhaseDisabled(order, firstIncompletePhaseOrder)}
            />
          ))}
        </div>
        {isCompleted && randomResource && (
          <RandomMessage
            source={randomResource.source}
            text={randomResource.text}
          />
        )}
      </StyledProgress>
    </StyledBackground>
  );
};

const StyledTitle = styled.p`
  font-size: ${(props) => props.theme.fontSize["large"]};
  font-weight: bold;
`;

const StyledBackground = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.color["grey"]};
`;
const StyledProgress = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 300px;
  background: ${(props) => props.theme.color["white"]};
  padding: ${(props) => `${props.theme.offset["2"]} `};
`;
