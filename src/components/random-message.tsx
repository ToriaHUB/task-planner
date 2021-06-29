import React from "react";
import styled from "styled-components";

type RandomMessageProps = {
  text: string;
  source: string;
};

export const RandomMessage: React.FC<RandomMessageProps> = (props) => {
  const { text, source } = props;

  return <RandomTextWrapper>{`${source}: ${text}`}</RandomTextWrapper>;
};

const RandomTextWrapper = styled.p`
  display: flex;
  font-style: italic;
  text-align: justify;
  padding: ${(props) => `${props.theme.offset["1"]} `};
  border: ${(props) => `3px solid ${props.theme.color["green"]}`};
  font-size: ${(props) => `${props.theme.fontSize["small"]} `};
`;
