import L2Screen from '../components/layout/L2Screen';
import L2Text from '../components/L2Text';
import L2Input from '../components/L2Input';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import L2SegmentedButtons from '../components/buttons/L2SegmentedButtons';
import React, {useEffect, useRef, useState} from 'react';
import L2Card from '../components/layout/L2Card';
import L2Button from '../components/buttons/L2Button';
import {Keyboard, TextInput, View} from 'react-native';
import L2Separator from '../components/layout/L2Separator';
import {Colors, playerColors} from '../styles/colors';
import {dimensions} from '../components/utils/dimensions';
import {PlayerModel, UserModel} from '../realmOM/realmModels';
import {useQuery} from '@realm/react';
import {IBottomSheet} from '../components/layout/DynamicBottomSheet';
import {Modal, Portal} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import L2ColorButton from '../components/buttons/L2ColorButton';
import {Player, useGeneralStore} from '../stores/stores';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import L2PlayerButton from '../components/buttons/L2PlayerButton';
import {ScrollView} from 'react-native-gesture-handler';

const HomeScreen: React.FC = () => {
  const bottomSheetRef = React.useRef<IBottomSheet>(null);
  const [visible, setVisible] = React.useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('red');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const newPlayerNameRef = useRef<{getValue: () => string}>(null);

  const players: Player[] = useGeneralStore(state => state.players);
  const addPlayer = useGeneralStore(state => state.addPlayer);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
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

  const addNewPlayer = () => {
    const np: Player = {
      id: uuidv4(),
      name: newPlayerNameRef.current?.getValue() ?? 'Player',
      color: selectedColor,
    };
    addPlayer(np);
    hideModal();
    console.log('addNewPlayer ', JSON.stringify(np));
  };

  return (
    <L2Screen style={{}} noHorizontalMargin={true}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <L2Card style={{margin: 15}}>
            <View
              style={{
                margin: 15,
                gap: dimensions.gap.betweenElements,
                flexDirection: 'column',
              }}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    gap: dimensions.gap.betweenPlayers,
                    flexWrap: 'wrap',
                    marginVertical: dimensions.gap.betweenPlayers,
                  }}>
                  {players?.map((player, index) => {
                    console.log('player ', JSON.stringify(player));
                    return <L2PlayerButton key={index} player={player} />;
                  })}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <L2Button variant="secondarySmall" onPress={showModal}>
                    Add new player
                  </L2Button>
                </View>
              </L2Card>
              <View style={{alignItems: 'center'}}>
                <L2Button variant="primary">Start Game</L2Button>
              </View>
            </View>
          </L2Card>
        </ScrollView>
      </KeyboardAvoidingView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.containerStyle,
            {marginBottom: keyboardHeight},
          ]}>
          <L2Text>Add new player.</L2Text>
          <L2Input
            ref={newPlayerNameRef}
            helperText="Required nick name, displayed in the table header"
            placeholder="Player name"
            keyboardType="default"
            autoFocus={true}
          />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {playerColors.map((color, index) => {
              return (
                <L2ColorButton
                  key={index}
                  selected={selectedColor === color.color}
                  color={color.color}
                  checkColor={color.checkColor}
                  onPress={() => {
                    setSelectedColor(color.color);
                  }}
                />
              );
            })}
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <L2Button
              variant="secondary"
              style={{flex: 1, flexGrow: 1}}
              onPress={hideModal}>
              Cancel
            </L2Button>
            <L2Button
              variant="primary"
              style={{flex: 1, flexGrow: 1}}
              onPress={addNewPlayer}>
              Save
            </L2Button>
          </View>
        </Modal>
      </Portal>
    </L2Screen>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    margin: 10,
    paddingVertical: 20,
    backgroundColor: Colors.modalBackgroundColor,
    borderColor: Colors.modalBorderColor,
    borderWidth: 1,
    gap: 20,
  },
});

export default HomeScreen;
