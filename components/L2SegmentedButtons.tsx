import React, {FC} from 'react';
import {Button, SegmentedButtons, useTheme} from 'react-native-paper';

type L2SegmentedButtonsProps = React.ComponentProps<typeof SegmentedButtons> & {
  onValueChange: (value: string) => void;
  value: string;
};

const L2SegmentedButtons: FC<L2SegmentedButtonsProps> = props => {
  const {buttons, onValueChange, multiSelect, value, ...restProps} = props;
  const [val, setVal] = React.useState<string>(value ?? buttons[0].value);
  return (
    <SegmentedButtons
      value={val}
      multiSelect={false}
      onValueChange={value => {
        setVal(value);
        onValueChange(value);
      }}
      buttons={buttons}
      {...restProps}
    />
  );
};

export default L2SegmentedButtons;
