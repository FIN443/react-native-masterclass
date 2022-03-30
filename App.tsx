import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  Pressable,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const position = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(225, 83, 99)", "rgb(112, 206, 221)"],
  });
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderRelease: () => {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          friction: 5,
          tension: 200,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;
  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: position.getTranslateTransform(),
        }}
      />
    </Container>
  );
}
