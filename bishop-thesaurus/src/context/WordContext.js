import { useContext, createContext, useState } from 'react';

export const CreateWordContext = createContext();

export const useWordContext = () => useContext(CreateWordContext);

export default function WordContextProvider({ children }) {
    const [word, setWord] = useState('');

    return (
        <CreateWordContext.Provider value={{ word, setWord }}>
            {children}
        </CreateWordContext.Provider>
    );
};