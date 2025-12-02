import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react"; // ← добавьте useMemo

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", "mock-jwt-token");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!user;

  // Используем useMemo для стабильного значения контекста
  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated,
    }),
    [user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {" "}
      {/* ← передаем memoized значение */}
      {children}
    </AuthContext.Provider>
  );
};

// Экспортируем только хук, чтобы исправить ESLint ошибку
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
