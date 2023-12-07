import React from 'react';
import {View} from 'react-native';

interface props {
  height?: number | undefined;
  width?: number | undefined;
}

const L2Spacer: React.FC<props> = props => {
  const {width = 10, height = 10} = props;
  return <View style={{width: width, height: height}} />;
};

export default L2Spacer;
