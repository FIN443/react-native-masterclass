import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Share, Platform } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, MovieDetails, moviesApi, TV, tvApi, TVDetails } from "../api";
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
  const { isLoading, data } = useQuery<MovieDetails | TVDetails>(
    [isMovie ? "movies" : "tv", item.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );
  const shareMedia = async () => {
    if (data) {
      const isAndroid = Platform.OS === "android";
      const homepage =
        isMovie && "imdb_id" in data
          ? `https://www.imdb.com/title/${data.imdb_id}`
          : data.homepage;
      if (isAndroid) {
        await Share.share({
          message: `${item.overview}\nCheck it out: ${homepage}`,
          title: "title" in item ? item.title : item.name,
        });
      } else {
        await Share.share({
          url: homepage,
          title: "title" in item ? item.title : item.name,
        });
      }
    }
  };
  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "title" in item ? "Movie" : "TV",
    });
  }, []);
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);
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
            <Ionicons name="logo-youtube" color="#ea3323" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
