import { defineStore } from 'pinia';

type BaseModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
  payload?: any;
};

interface ModalState {
  name: ModalName | null;
  props: BaseModalProps | null;
}

export enum ModalName {
  EditBlock = 'edit-block-modal',
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useModal = defineStore('modal', {
  // other options...
  state: (): ModalState => {
    return {
      // all these properties will have their type inferred automatically
      name: null,
      props: null,
    };
  },

  getters: {
    isOpened: (state: ModalState): boolean => !!state.name,
    activeModalName: (state: ModalState): string => state?.name ?? `div`,
    modalProps: (state: ModalState): BaseModalProps | null => state.props,
  },

  actions: {
    openModal(name: ModalName, props: BaseModalProps) {
      this.name = name;
      this.props = props;
    },
    closeModal() {
      this.name = null;
      this.props = null;
    },
  },
});
