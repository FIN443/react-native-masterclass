import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { MovieProps, TvProps } from "../api";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

interface MediaProps {
  title?: string;
  backdrop_path: string | null;
  id: number;
  name?: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
}

interface HListProps {
  title: string;
  data: MediaProps[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path || ""}
          originalTitle={item.name ?? item.title}
          voteAverage={item.vote_average}
        />
      )}
    />
  </ListContainer>
);

export default HList;
