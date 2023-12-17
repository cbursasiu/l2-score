import React from 'react';
import {Modal} from 'react-native-paper';

type L2ModalProps = React.ComponentProps<typeof Modal> & {
  visible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
};

const L2Modal = ({visible, onDismiss, children, ...restProp}: L2ModalProps) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss} {...restProp}>
      {children}
    </Modal>
  );
};

export default L2Modal;
