import {create} from 'zustand';
import {Settings} from '../types/typeDeclarations';

export type Player = {
  id: string;
  name: string;
  color: string;
};

export interface GeneralState {
  settings: Settings;
  players: Player[];
  setSettings: (value: Settings) => void;
  setPlayers: (value: Player[]) => void;
  addPlayer: (value: Player) => void;
  removePlayer: (value: Player) => void;
  updatePlayer: (value: Player) => void;
}

export const useGeneralStore = create<GeneralState>(set => ({
  settings: {
    showDealer: true,
    showTotalLeader: true,
    showRoundLeader: true,
  },
  players: [],
  setSettings: (value: Settings) => set(() => ({settings: value})),
  setPlayers: (value: Player[]) => set(() => ({players: value})),
  addPlayer: (value: Player) =>
    set(state => ({players: [...state.players, value]})),
  removePlayer: (value: Player) =>
    set(state => ({
      players: state.players.filter(player => player.id !== value.id),
    })),
  updatePlayer: (value: Player) =>
    set(state => ({
      players: state.players.map(player =>
        player.id === value.id ? value : player,
      ),
    })),
}));
