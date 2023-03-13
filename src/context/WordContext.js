import { useContext, createContext, useState } from 'react';

export const CreateWordContext = createContext();

export const useWordContext = () => useContext(CreateWordContext);

export default function WordContextProvider({ children }) {
    const [wordContext, setWordContext] = useState('');

    return (
        <CreateWordContext.Provider value={{ wordContext, setWordContext }}>
            {children}
        </CreateWordContext.Provider>
    );
};