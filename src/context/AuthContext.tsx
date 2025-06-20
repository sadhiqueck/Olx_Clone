import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {signOut } from "firebase/auth/web-extension";
import { auth } from "../config/FirebaseConfig";


export interface UserIF {
  username: string;
  email: string;
  uid: string;
}

interface AuthContextIF {
  user: UserIF | null;
  login: (user: UserIF) => void;
  logout: () => Promise<void>;
}

interface AuthProviderIF {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextIF | null>(null);

export const AuthProvider = ({ children }: AuthProviderIF) => {
  const [user, setUser] = useState<UserIF | null>(null);

  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (user: UserIF) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem('user');
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UserAuth must be used within an AuthProvider");
  }
  return context;
};
