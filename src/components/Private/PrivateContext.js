//REACT
import { createContext } from 'react';

const PrivateContext = createContext({
    privateFunctionality: null,
    setPrivateFunctionality: () => {},
});

export default PrivateContext;
