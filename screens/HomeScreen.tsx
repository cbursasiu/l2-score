import L2Screen from '../components/layout/L2Screen';

import L2Text from '../components/L2Text';
import L2Input from '../components/L2Input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import L2SegmentedButtons from '../components/L2SegmentedButtons';
import React, {useState} from 'react';
import L2Spacer from '../components/layout/L2Spacer';

const HomeScreen: React.FC = () => {
  const buttons = [
    {
      label: 'Highest score wins',
      value: '1',
      showSelectedCheck: true,
    },
    {
      label: 'Lowest score wins',
      value: '2',
      showSelectedCheck: true,
    },
  ];
  const [value, setValue] = useState<string>(buttons[0].value);
  return (
    <L2Screen style={{}} noHorizontalMargin={true}>
      <KeyboardAvoidingView style={{gap: 40, margin: 10}} behavior="padding">
        <L2Text style={{alignSelf: 'center'}} variant="headlineSmall">
          Configure your next game
        </L2Text>
        <L2Input
          helperText="Optional, don’t worry, will generate one for you"
          placeholder="Game name"
        />
        <L2SegmentedButtons
          buttons={buttons}
          onValueChange={setValue}
          value={buttons[0].value}
        />
        <L2Input
          helperText="Optional, reaching this score ends the game"
          placeholder="Maximum points"
          keyboardType="numeric"
        />
        <L2Input
          helperText="Optional, game ends after the provided round number"
          placeholder="Maximum rounds"
          keyboardType="numeric"
        />
      </KeyboardAvoidingView>
    </L2Screen>
  );
};
export default HomeScreen;
