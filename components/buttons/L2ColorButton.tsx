import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {dimensions} from '../utils/dimensions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {Colors} from '../../styles/colors';

interface L2ButtonProps {
  color?: string;
  checkColor?: string;
  selected?: boolean;
  onPress?: () => void;
}

const L2Button: FC<L2ButtonProps> = props => {
  const {
    color,
    checkColor = Colors.primaryColor,
    selected = false,
    onPress,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: color}]}
      onPress={onPress}
      activeOpacity={0.8}>
      {selected && (
        <FontAwesomeIcon
          icon={faCheck}
          color={checkColor}
          size={dimensions.buttons.colorButton / 2}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: dimensions.buttons.colorButton,
    height: dimensions.buttons.colorButton,
    width: dimensions.buttons.colorButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default L2Button;
