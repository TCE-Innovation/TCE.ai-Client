import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './Navigation';
import { AuthenticatedRoute, AuthProvider, UnauthenticatedRoute } from "../AzureAuth/Auth";
import Dashboard from "./Dashboard/Dashboard";

import Login from "./Login";
import Account from "./Account";

import DashboardContext from '../components/Dashboard/DashboardContext';

function App() {
    const [selectedFunctionality, setSelectedFunctionality] = useState('home');
    return (
        <AuthProvider>
            <DashboardContext.Provider value={{ selectedFunctionality, setSelectedFunctionality }}>
                <Router>
                    <div className="App">
                        <header className="App-header">
                            <Navigation />
                        </header>
                    </div>
                    <Routes>
                        <Route exact path='/' element={<AuthenticatedRoute />}>
                            <Route exact path='/' element={<Dashboard />} />
                        </Route>

                        <Route exact path='/account' element={<AuthenticatedRoute />}>
                            <Route exact path='/account' element={<Account />} />
                        </Route>

                        <Route exact path='/login' element={<UnauthenticatedRoute />}>
                            <Route path='/login' element={<Login />} />
                        </Route>

                    </Routes>
                </Router>
            </DashboardContext.Provider>
        </AuthProvider>
    );
}

export default App;
