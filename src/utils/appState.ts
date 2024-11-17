import React from "react";

export interface User {
  address: string;
  balance: number;
}
export interface IAppContextProps {
  user: User;
  setUser: (userOrUpdater: User | ((prevUser: User) => User)) => void;
  tgUserName: string;
  setTgUserName: (name: string) => void;
  refreshProfile: () => void;
  tonWalletAddress: string;
  setTonWalletAddress: (address: string) => void;
  isInitialized: boolean;
  setIsInitialized: (value: boolean) => void;
}

const defaultValue: IAppContextProps = {
  user: { address: "", balance: 0 },
  setUser: () => {},
  tgUserName: "",
  setTgUserName: () => {},
  refreshProfile: () => {},
  tonWalletAddress: "",
  setTonWalletAddress: () => {},
  isInitialized: false,
  setIsInitialized: () => {},
};

const AppStateContext = React.createContext(defaultValue);

export const useAppState = () => React.useContext(AppStateContext);

export default AppStateContext;
