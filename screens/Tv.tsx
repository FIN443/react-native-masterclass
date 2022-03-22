import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi, TvResponse } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
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
  const loading = todayLoading || topLoading || trendingLoading;
  const refreshing = todayRefetching || topRefetching || trendingRefetching;
  if (loading) {
    return <Loader />;
  }
  return (
    // 수평 FlatList는 수직 ScrollView에서 사용 가능
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
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
