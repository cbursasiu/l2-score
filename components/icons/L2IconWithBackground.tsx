import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {dimensions} from '../utils/dimensions';
import {Colors} from '../../styles/colors';

interface IconProps {
  color?: string;
  icon: IconProp;
  onPress?: () => void;
  size?: number;
}

const L2IconWithBackground: React.FC<IconProps> = ({
  onPress,
  color,
  icon,
  size,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.iconStyle}>
        <FontAwesomeIcon
          icon={icon}
          color={color}
          style={styles.iconStyle}
          size={size}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: dimensions.icon.borderRadius,
    width: dimensions.icon.headerIconSize,
    height: dimensions.icon.headerIconSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {backgroundColor: Colors.cardPrimaryBackgroundColor},
});

export default L2IconWithBackground;
