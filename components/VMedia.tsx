import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string | null;
  originalTitle?: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => (
  <Movie>
    <Poster path={posterPath || ""} />
    {originalTitle ? (
      <Title>
        {originalTitle.slice(0, 8)}
        {originalTitle.length > 9 ? "..." : null}
      </Title>
    ) : (
      <Title></Title>
    )}
    <Votes votes={voteAverage} />
  </Movie>
);

export default VMedia;
