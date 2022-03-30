import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
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
  const [up, setUp] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    Animated.timing(position, {
      toValue: up ? 300 : -300,
      duration: 2000,
      useNativeDriver: false,
    }).start(toggleUp);
  };
  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(225, 83, 99)", "rgb(112, 206, 221)"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ rotateY: rotation }, { translateY: position.y }],
          }}
        />
      </Pressable>
    </Container>
  );
}
