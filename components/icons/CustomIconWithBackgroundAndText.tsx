import React from 'react';

import {StyleSheet, View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {dimensions} from '../utils/dimensions';
import L2IconWithBackground from './L2IconWithBackground';
import {VariantProp} from 'react-native-paper/lib/typescript/components/Typography/types';
import L2Text from '../L2Text';

interface IconProps {
  color?: string;
  icon: IconProp;
  onPress?: () => void;
  size?: number;
  label: string;
  textVariant?: VariantProp<Text>;
}

const CustomIconWithBackgroundAndText: React.FC<IconProps> = ({
  label,
  onPress,
  color,
  icon,
  size,
  textVariant = 'bodySmall',
}) => {
  return (
    <View style={styles.container}>
      <L2IconWithBackground
        size={size ?? dimensions.icon.iconSize.smallMedium}
        color={color}
        icon={icon}
        onPress={onPress}
      />
      <L2Text variant={textVariant}>{label}</L2Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomIconWithBackgroundAndText;
