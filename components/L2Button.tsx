import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {dimensions} from './utils/dimensions';

interface L2ButtonProps extends React.ComponentProps<typeof Button> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'secondarySmall'
    | 'link'
    | 'outline'
    | 'noBackground'
    | 'danger';
  children: React.ReactNode;
}

const modalMap = {
  primary: 'contained',
  secondary: 'contained-tonal',
  secondarySmall: 'contained-tonal',
  outline: 'outlined',
  noBackground: 'text',
  link: 'text',
  danger: 'contained',
};

const L2Button: FC<L2ButtonProps> = props => {
  const theme = useTheme();
  const {variant = 'primary', style, children, ...restProps} = props;
  return variant === 'danger' ? (
    <Button
      mode="contained"
      buttonColor={theme.colors.errorContainer}
      textColor={theme.colors.error}
      {...restProps}
      style={style}>
      {children}
    </Button>
  ) : (
    <Button
      labelStyle={
        variant === 'secondarySmall' && {
          marginVertical: dimensions.buttons.smallSecondaryMargin,
        }
      }
      mode={modalMap[variant] as 'contained' | 'contained-tonal' | 'text'}
      {...restProps}>
      {children}
    </Button>
  );
};

export default L2Button;
