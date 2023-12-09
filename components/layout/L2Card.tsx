import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Colors} from '../../styles/colors';
import {dimensions} from '../utils/dimensions';

type L2CardProps = React.ComponentProps<typeof Card> & {
  variant?: 'primary' | 'secondary';
};

const L2Card: React.FC<L2CardProps> = props => {
  const {variant = 'primary', style, children, ...restProps} = props;
  return (
    <Card
      {...restProps}
      style={[
        style,
        variant === 'primary' ? styles.primaryCard : styles.secondaryCard,
      ]}>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  primaryCard: {
    backgroundColor: Colors.cardPrimaryBackgroundColor,
  },
  secondaryCard: {
    backgroundColor: Colors.cardSecondaryBackgroundColor,
    borderWidth: dimensions.borderWidth.smallBorderWidth,
    borderColor: Colors.cardSecondaryBorderColor,
  },
});

export default L2Card;
