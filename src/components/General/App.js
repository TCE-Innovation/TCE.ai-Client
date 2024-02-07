//REACT
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//COMPONENTS
import Account from "../Account/Account";
import Login from "../Account/Login";
import Private from "../Private/Private";
import Public from "../Public/Public";
import Document from "../PublicFeatures/Publications/Document";

//AUTH
import { AuthenticatedRoute, UnauthenticatedRoute, AuthProvider } from "../../authentication/Auth";

function App() {  
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    
                    <Route exact path='/' element={<Public />} />
                    <Route exact path='/document' element={<Document />} />
                    
                    <Route path="/login" element={<UnauthenticatedRoute />}>
                        <Route index element={<Login />} />
                    </Route>

                    <Route path='/account' element={<AuthenticatedRoute />}>
                        <Route index element={<Account />} />
                    </Route>

                    <Route path='/private/:tool' element={<AuthenticatedRoute />}>
                        <Route index element={<Private />} />
                    </Route>

                    <Route path='*' element={<Navigate to="/" replace />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
