//REACT
import { createContext } from 'react';

const PublicContext = createContext({
    publicFunctionality: null,
    setPublicFunctionality: () => {},
});

export default PublicContext;
