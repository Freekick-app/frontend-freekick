import React from "react";

export interface User {
  address: string;
  balance: number;
}
export interface IAppContextProps {
  user: User;
  setUser: (user: User) => void;
  tgUserName: string;
  setTgUserName: (name: string) => void;
  refreshProfile: () => void;
}

const defaultValue: IAppContextProps = {
  user: { address: "", balance: 0 },
  setUser: () => {},
  tgUserName: "",
  setTgUserName: () => {},
  refreshProfile: () => {},
};

const AppStateContext = React.createContext(defaultValue);

export const useAppState = () => React.useContext(AppStateContext);

export default AppStateContext;
