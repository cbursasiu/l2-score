import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import {dimensions} from '../utils/dimensions';

import L2IconWithBackground from '../icons/L2IconWithBackground';
import {faX} from '@fortawesome/free-solid-svg-icons';
import L2Spacer from './L2Spacer';
import L2Text from '../L2Text';

export interface IBottomSheet {
  open(): void;
  close(): void;
  isOpened: boolean;
}

interface Props {
  children: JSX.Element;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  onOpened?: () => void;
  onClosed?: () => void;
}
const DynamicBottomSheetWithTitle = forwardRef<IBottomSheet, Props>(
  ({onOpened = null, onClosed = null, children, title}, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [isShowing, setIsShowing] = useState<boolean>(false);

    const renderBackdrop = useCallback(
      (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          enableTouchThrough={false}
        />
      ),
      [],
    );

    const openSheet = useCallback(() => {
      if (!isShowing) {
        sheetRef.current?.snapToIndex(0);
        if (onOpened !== null) {
          onOpened();
        }
      }
    }, [isShowing, onOpened]);

    const closeSheet = useCallback(() => {
      if (isShowing) {
        sheetRef.current?.close();
        if (onClosed !== null) {
          onClosed();
        }
      }
    }, [isShowing, onClosed]);

    useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            openSheet();
          },
          close() {
            closeSheet();
          },
          isOpened: isShowing,
        };
      },
      [openSheet, closeSheet, isShowing],
    );

    return (
      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={true}
        index={-1}
        onClose={() => {
          if (isShowing && onClosed !== null) {
            onClosed();
          }
        }}
        onChange={idx => {
          setIsShowing(idx < 0 ? false : true);
        }}>
        <BottomSheetView style={styles.root}>
          <View style={styles.title}>
            <L2Text variant="bodyMedium">{title}</L2Text>
            <L2IconWithBackground icon={faX} onPress={closeSheet} />
          </View>
          <L2Spacer />
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  root: {
    padding: dimensions.padding.screenPadding,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    alignSelf: 'center',
  },
});

export default DynamicBottomSheetWithTitle;
