import L2Screen from '../components/layout/L2Screen';

import L2Text from '../components/L2Text';
import L2Input from '../components/L2Input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import L2SegmentedButtons from '../components/L2SegmentedButtons';
import React, {useCallback, useEffect, useState} from 'react';
import L2Card from '../components/layout/L2Card';
import L2Button from '../components/L2Button';
import {Modal, View} from 'react-native';
import L2Separator from '../components/layout/L2Separator';
import {Colors} from '../styles/colors';
import {dimensions} from '../components/utils/dimensions';
import {PlayerModel, UserModel} from '../realmOM/realmModels';
import {useQuery} from '@realm/react';
import DynamicBottomSheetWithTitle, {
  IBottomSheet,
} from '../components/layout/DynamicBottomSheet';
import {Portal} from 'react-native-paper';
import L2Portal from '../components/layout/L2Portal';
import L2Modal from '../components/layout/L2Portal';

const HomeScreen: React.FC = () => {
  const [players, setPlayers] = useState<Realm.List<PlayerModel> | undefined>();
  const bottomSheetRef = React.useRef<IBottomSheet>(null);
  const [visible, setVisible] = React.useState(false);

  const userData = useQuery(UserModel, userModel => {
    return userModel;
  });

  useEffect(() => {
    setPlayers(userData.at(0)?.players);
  }, []);

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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
              <L2Button variant="secondarySmall" onPress={showModal}>
                Add new player
              </L2Button>
            </View>
          </L2Card>
          <View style={{alignItems: 'center'}}>
            <L2Button variant="primary">Start Game</L2Button>
          </View>
        </KeyboardAvoidingView>
      </L2Card>
      <Portal>
        <L2Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <L2Text>Example Modal. Click outside this area to dismiss.</L2Text>
          <View style={{alignItems: 'center'}}>
            <L2Button variant="primary">Start Game</L2Button>
          </View>
        </L2Modal>
      </Portal>
    </L2Screen>
  );
};

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    margin: 20,
    backgroundColor: Colors.secondaryContainerColor,
  },
});

export default HomeScreen;
