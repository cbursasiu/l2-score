import React from 'react';
import L2Screen from '../components/layout/L2Screen';
import {View} from 'react-native';
import L2Text from '../components/L2Text';

const HomeScreen: React.FC = () => {
  return (
    <L2Screen noHorizontalMargin={true}>
      <L2Text>HomeScreen</L2Text>
    </L2Screen>
  );
};
export default HomeScreen;
