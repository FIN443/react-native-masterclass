import {
  NavigationProp,
  NavigationState,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

interface RouteProps extends RouteProp<ParamListBase> {
  params: {
    originalTitle: string;
  };
}

interface NavigationProps {
  navigation: NavigationProp<NavigationState>;
  route: RouteProps;
}

const Detail = ({
  navigation: { setOptions },
  route: {
    params: { originalTitle },
  },
}: NavigationProps) => {
  useEffect(() => {
    setOptions({
      title: originalTitle,
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
