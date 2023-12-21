import React, {FC} from 'react';
import {Button, IconButton} from 'react-native-paper';
import {dimensions} from '../utils/dimensions';
import {Player} from '../../stores/stores';

interface L2PlayerButtonProps {
  isPickedIndex?: number;
  player: Player;
}

const L2PlayerButton: FC<L2PlayerButtonProps> = props => {
  const {isPickedIndex, player} = props;
  const text =
    player.name +
    (isPickedIndex !== undefined ? ' (' + isPickedIndex + ')' : '');
  return (
    <Button
      mode={isPickedIndex !== undefined ? 'elevated' : 'outlined'}
      labelStyle={{
        color: player.color,
        marginVertical: dimensions.buttons.smallSecondaryMargin / 2,
      }}
      icon={isPickedIndex !== undefined ? 'minus' : 'plus'}>
      {text}
    </Button>
  );
};

export default L2PlayerButton;
