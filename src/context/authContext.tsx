import { createContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextInterface {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: {} as any,
  setUser: () => {},
  isActive: false,
  setIsActive: () => {},
});

type UserProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>({} as any);
  const [isActive, setIsActive] = useState<boolean>(false);

  const values = {
    user,
    setUser,
    isActive,
    setIsActive,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;