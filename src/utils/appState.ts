import React from "react";

export interface User {
  address: string;
  balance: number;
}

export interface TgUser {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  language_code?: string;
  last_name?: string;
  photo_url?: string;
  username?: string;
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
  setTgUser: (user: TgUser | ((prevUser: TgUser) => TgUser)) => void;
  tgUser: TgUser;
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
  setTgUser: () => {},
  tgUser: { allows_write_to_pm: false, first_name: "", id: 0 },
};

const AppStateContext = React.createContext(defaultValue);

export const useAppState = () => React.useContext(AppStateContext);

export default AppStateContext;
