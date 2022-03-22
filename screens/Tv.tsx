import React from "react";
import { Dimensions, RefreshControl, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import { tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";
import Slide from "../components/Slide";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Tv = () => {
  const queryClient = useQueryClient();
  const {
    isLoading: popularLoading,
    data: popularData,
    isRefetching: popularRefetching,
  } = useQuery<TvResponse>(["tv", "popular"], tvApi.popular);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery<TvResponse>(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery<TvResponse>(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery<TvResponse>(["tv", "trending"], tvApi.trending);
  const onRefresh = () => {
    queryClient.refetchQueries(["tv"]);
  };
  const loading =
    popularLoading || todayLoading || topLoading || trendingLoading;
  const refreshing =
    popularRefetching || todayRefetching || topRefetching || trendingRefetching;
  if (loading) {
    return <Loader />;
  }
  return (
    // 수평 FlatList는 수직 ScrollView에서 사용 가능
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // contentContainerStyle={{ paddingVertical: 30 }}
    >
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{
          marginBottom: 40,
          width: "100%",
          height: SCREEN_HEIGHT / 4,
        }}
      >
        {popularData?.results.map((media) => (
          <Slide
            key={media.id}
            backdropPath={media.backdrop_path || ""}
            posterPath={media.poster_path || ""}
            originalTitle={media.name}
            voteAverage={media.vote_average}
            overview={media.overview}
          />
        ))}
      </Swiper>
      {trendingData ? (
        <HList title="Trending TV" data={trendingData.results} />
      ) : null}
      {todayData ? (
        <HList title="Airing Today" data={todayData.results} />
      ) : null}
      {topData ? <HList title="Top Rated TV" data={topData.results} /> : null}
    </ScrollView>
  );
};
export default Tv;
