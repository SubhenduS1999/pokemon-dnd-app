import { createContext, useState, type ReactNode } from "react";

type AppContextType = {
  favorites: string[];
  toggleFavorite: (name: string) => void;
};

export const AppContext = createContext<AppContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  });

  const toggleFavorite = (name: string) => {
    let updated = favorites.includes(name)
      ? favorites.filter((f) => f !== name)
      : [...favorites, name];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
};