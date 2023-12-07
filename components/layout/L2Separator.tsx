import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface props {
  color: string;
}

const L2Separator: React.FC<props & ViewProps> = props => {
  const {style, color, ...rest} = props;
  return (
    <View style={[styles.container, style, {borderColor: color}]} {...rest} />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
});

export default L2Separator;
