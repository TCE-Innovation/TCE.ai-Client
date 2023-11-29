//REACT
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//COMPONENTS
import Account from "../Account/Account";
import Private from "../Private/Private";
import Public from "../Public/Public";

//CONTEXT
import PrivateContext from '../Private/PrivateContext';

//AUTH
import { AuthenticatedRoute, AuthProvider } from "../../authentication/Auth";

function App() {
    const [privateFunctionality, setPrivateFunctionality] = useState('privateHome');
    
    return (
        <AuthProvider>
            <PrivateContext.Provider value={{ privateFunctionality, setPrivateFunctionality }}>
                <Router>
                    <Routes>

                        <Route exact path='/' element={<Public />} />
                        
                        <Route path='/account' element={<AuthenticatedRoute />}>
                            <Route index element={<Account />} />
                        </Route>

                        <Route path='/private' element={<AuthenticatedRoute />}>
                            <Route index element={<Private />}/>
                        </Route>

                        <Route path='*' element={<Navigate to="/" replace />} />

                    </Routes>
                </Router>
            </PrivateContext.Provider>
        </AuthProvider>
    );
}

export default App;
