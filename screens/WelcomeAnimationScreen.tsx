import React from 'react';
import {Dimensions, StyleSheet, View} from '../node_modules/react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {Colors} from '../styles/colors';
import {useStore} from '../stores/store';
import {navigate} from '../services/navigationServices';
import {Routes} from '../components/navigation/NavigationContainerWrapper';

const startPulseSize = 300;

const Pulse = () => {
  const animation = useSharedValue(0);
  const store = useStore();
  const [isFinished, setIsFinished] = React.useState(false);
  const maxDimension = Math.sqrt(
    Math.pow(Dimensions.get('window').width, 2) +
      Math.pow(Dimensions.get('window').height, 2),
  );

  const onFinished = async () => {
    'worklet';
    runOnJS(navigate)(Routes.TabNavigationContainerWrapper);
  };

  useEffect(() => {
    animation.value = withTiming(
      maxDimension / startPulseSize,
      {
        duration: 500,
        easing: Easing.linear,
      },
      onFinished,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, maxDimension]);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, maxDimension / startPulseSize],
      [1, 0.2],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{scale: animation.value}],
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};

const WelcomeAnimationScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Pulse />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: Colors.screenBackground,
    padding: 8,
    alignItems: 'center',
  },
  circle: {
    width: startPulseSize,
    borderRadius: startPulseSize / 4,
    height: startPulseSize,
    position: 'absolute',
    backgroundColor: Colors.primaryColor,
  },
});

export default WelcomeAnimationScreen;
