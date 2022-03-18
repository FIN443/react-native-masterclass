import React from "react";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => (props.seleted ? "blue" : "red")};
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title seleted={true}>Movies</Title>
    <Title seleted={false}>Movies</Title>
  </Btn>
);

export default Movies;
