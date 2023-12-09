import L2Screen from '../components/layout/L2Screen';

import L2Text from '../components/L2Text';
import L2Input from '../components/L2Input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import L2SegmentedButtons from '../components/L2SegmentedButtons';
import React, {useState} from 'react';
import L2Card from '../components/layout/L2Card';
import L2Button from '../components/L2Button';
import {View} from 'react-native';
import L2Separator from '../components/layout/L2Separator';
import {Colors} from '../styles/colors';
import {dimensions} from '../components/utils/dimensions';

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
      <L2Card style={{margin: 15}}>
        <KeyboardAvoidingView
          style={{
            margin: 15,
            gap: dimensions.gap.betweenElements,
            flexDirection: 'column',
          }}
          behavior="padding">
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
          <L2Card
            style={{
              padding: 15,
              flexDirection: 'column',
              gap: dimensions.padding.betweenCards,
            }}
            variant="secondary">
            <L2Separator color={Colors.cardSecondarySeparatorColor} />
            <View style={{flexDirection: 'row'}}>
              <L2Button variant="secondarySmall">Add new player</L2Button>
            </View>
          </L2Card>
          <View style={{alignItems: 'center'}}>
            <L2Button variant="primary">Start Game</L2Button>
          </View>
        </KeyboardAvoidingView>
      </L2Card>
    </L2Screen>
  );
};
export default HomeScreen;
