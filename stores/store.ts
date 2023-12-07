import {create} from '../node_modules/zustand';
import {Settings} from '../types/typeDeclarations';

interface State {
  settings: Settings;
  setSettings: (value: Settings) => void;
}

export const useStore = create<State>(set => ({
  settings: {
    showDealer: true,
    showTotalLeader: true,
    showRoundLeader: true,
  },
  setSettings: (value: Settings) => set(state => ({...state, settings: value})),
}));
