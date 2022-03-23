import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import colors from "../colors";
import Poster from "../components/Poster";
import { makeImgPath, SCREEN_HEIGHT } from "../utils";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params: item },
}) => {
  useEffect(() => {
    setOptions({
      title: "title" in item ? "Movie" : "TV",
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(item.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", colors.black]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={item.poster_path || ""} />
          <Title>{"title" in item ? item.title : item.name}</Title>
        </Column>
      </Header>
      <Overview>{item.overview}</Overview>
    </Container>
  );
};

export default Detail;
