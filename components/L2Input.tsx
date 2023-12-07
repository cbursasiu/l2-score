import * as React from 'react';
import {forwardRef, useState} from 'react';
import {
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from '../node_modules/react-native';
import {TextInput, TextInputProps} from 'react-native-paper';
import L2Text from './L2Text';
import {Colors} from '../styles/colors';

export interface CustomInputFieldProps extends TextInputProps {
  helperText?: string;
  errorText?: string;
  contentStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const L2Input = forwardRef((props: CustomInputFieldProps, ref: any) => {
  const {
    containerStyle,
    label,
    helperText,
    errorText,
    contentStyle,
    ...restProps
  } = props;
  const [value, setValue] = useState<string>('');

  return (
    <View style={containerStyle}>
      <TextInput
        ref={ref}
        mode="flat"
        value={value}
        label={label && <L2Text variant="bodySmall">{label}</L2Text>}
        underlineStyle={styles.underlineStyle}
        contentStyle={{...styles.contentStyle, ...contentStyle}}
        selectionColor={Colors.primaryTextColor}
        cursorColor={Colors.primaryTextColor}
        placeholderTextColor={Colors.placeholderColor}
        onChange={event => {
          setValue(event.nativeEvent.text);
        }}
        right={
          <TextInput.Icon
            icon="close-circle-outline"
            onPress={() => {
              setValue('');
            }}
          />
        }
        {...restProps}
      />
      {helperText ? (
        <L2Text variant="bodySmall" style={[styles.subText, styles.helperText]}>
          {helperText}
        </L2Text>
      ) : (
        <></>
      )}
      {errorText ? (
        <L2Text style={styles.subText} variant="bodySmall">
          {errorText}
        </L2Text>
      ) : (
        <></>
      )}
    </View>
  );
});

export default L2Input;

const styles = StyleSheet.create({
  baseStyle: {
    width: '100%',
    backgroundColor: Colors.screenBackground,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  selectedStyle: {
    borderColor: Colors.primaryTextColor,
  },
  errorStyle: {
    borderColor: Colors.errorBorder,
  },
  underlineStyle: {
    backgroundColor: 'transparent',
  },
  contentStyle: {
    color: Colors.primaryTextColor,
  },
  subText: {
    paddingLeft: 19,
    paddingTop: 5,
  },
  helperText: {
    color: Colors.labelTextColor,
  },
});
