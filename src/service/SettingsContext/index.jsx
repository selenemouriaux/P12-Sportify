import { createContext, useState } from "react";

export const SettingsContext = createContext(null);

export const SettingsContextProvider = ({ children }) => {
  const [source, setSource] = useState('local');
  const [userId, setUserId] = useState(12);

  const value = {
    source,
    setSource,
    userId,
    setUserId
  }

  return (
    <SettingsContext.Provider value={value}> {children} </SettingsContext.Provider>
  );
};

export default SettingsContext;