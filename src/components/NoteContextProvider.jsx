import React, { createContext, useContext, useState } from "react";

export const NoteContext = createContext();

export const useNotes = () => {
  return useContext(NoteContext);
};

const NoteContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
