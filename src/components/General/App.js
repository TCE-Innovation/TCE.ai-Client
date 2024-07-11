//REACT
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//COMPONENTS
import SignIn from "../Account/SignIn";
import Private from "../Private/Private";
import Public from "../Public/Public";
import Document from "../PublicFeatures/Publications/Document";
import Gateway from './Gateway/Gateway';
import Clearance from '../PublicFeatures/Clearance/Clearance';

//AUTH
import { AuthenticatedRoute, UnauthenticatedRoute, AuthProvider } from "../../authentication/Auth";

function App() {  
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<UnauthenticatedRoute />}>
                        <Route index element={<Gateway />} /> 
                    </Route>

                    <Route exact path='/public' element={<Public />} />

                    <Route exact path='/document' element={<Document />} />
                    
                    <Route path="/sign-in" element={<UnauthenticatedRoute />}>
                        <Route index element={<SignIn />} />
                    </Route>

                    <Route path="/apps/clearance-calculator" element={<Clearance />} />

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
