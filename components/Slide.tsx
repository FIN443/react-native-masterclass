import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const OverView = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
const Votes = styled(OverView)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={50}
        tint={isDark ? "dark" : "light"}
        // react-native-community/blur
        // blurType={isDark ? "dark" : "light"}
        // blurAmount={10}
        // reducedTransparencyFallbackColor={isDark ? "black" : "white"}
      />
      <Wrapper>
        <Poster path={posterPath} />
        <Column>
          <Title isDark={isDark}>{originalTitle}</Title>
          {voteAverage > 0 ? (
            <Votes isDark={isDark}>⭐ {voteAverage}/10</Votes>
          ) : null}
          <OverView isDark={isDark}>
            {overview !== ""
              ? overview.length > 80
                ? `${overview.slice(0, 80)}...`
                : overview
              : "요약 없음"}
          </OverView>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
