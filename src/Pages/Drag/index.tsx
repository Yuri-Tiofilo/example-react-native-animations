import React from 'react';
import { View } from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// import { Container } from './styles';

const Drag: React.FC = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event: any, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event: any, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: positionX.value}, {translateY: positionY.value}],
    }
  })

  return (
    <View style={{flex: 1}}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[{width: 150, height: 150, backgroundColor: '#f67'}, positionStyle]} />
      </PanGestureHandler>
    </View>
  );
}

export default Drag;
