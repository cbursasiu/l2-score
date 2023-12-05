import React from 'react';
import L2Screen from '../components/layout/L2Screen';
import {View} from 'react-native';
import L2Text from '../components/L2Text';

const SettingsScreen: React.FC = () => {
  return (
    <L2Screen noHorizontalMargin={true}>
      <L2Text>SettingsScreen</L2Text>
    </L2Screen>
  );
};
export default SettingsScreen;
