//REACT
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//COMPONENTS
import Navigation from './Navigation';
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
                        <div className="App">
                            <header className="App-header">
                                <Navigation />
                            </header>
                        </div>
                        <Routes>

                            <Route exact path='/' element={<Public />} />
                            
                            <Route exact path='/account' element={<AuthenticatedRoute />}>
                                <Route exact path='/account' element={<Account />} />
                            </Route>
                            
                            <Route exact path='/private' element={<AuthenticatedRoute />}>
                                <Route exact path='/private' element={<Private />}/>
                            </Route>

                        </Routes>
                    </Router>
            </PrivateContext.Provider>
        </AuthProvider>
    );
}

export default App;
