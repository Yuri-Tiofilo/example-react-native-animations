import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
  sequence,
}
from 'react-native-reanimated';

import ImageHero from '../Assets/hero.png';

import {View, Text, StyleSheet, StatusBar} from 'react-native';

const Login: React.FC = () => {
  const titlePosition = useSharedValue(60);
  const imagePosition = useSharedValue(-60);

  useEffect(() => {
    imagePosition.value = withTiming(0, {
      duration: 500,
    }, () => { //callback
      titlePosition.value = sequence(
        withTiming(0, {
          duration: 1000,
          easing: Easing.bounce,
        })
      );
    });
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: titlePosition.value },
      ],
      opacity: interpolate(
        titlePosition.value,
        [60, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    }
  });

  const heroStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: imagePosition.value },
      ],
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#13131a"/>

      <Animated.Image source={ImageHero} style={[styles.hero, heroStyle]}/>

      <Animated.Text style={[styles.title, titleStyle]}>Fala dev!</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    width: 280,
    height: 200,
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 32,
  }
});

export default Login;
