import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
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

const Data = styled.View`
  padding: 0 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
  margin-right: 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params: item },
}) => {
  const isMovie = "title" in item;
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", item.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  useEffect(() => {
    setOptions({
      title: "title" in item ? "Movie" : "TV",
    });
  }, []);
  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
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
      <Data>
        <Overview>{item.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
