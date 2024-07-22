//REACT
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { isMobile, isTablet } from 'react-device-detect';

//COMPONENTS
import SignIn from "../Account/SignIn";
import Private from "../Private/Private";
import Public from "../Public/Public";
import Document from "../PublicFeatures/Publications/Document";
import Gateway from './Gateway/Gateway';
import Clearance from '../PublicFeatures/Clearance/Clearance';
import TrainLoader from './TrainLoader';

//AUTH
import { AuthenticatedRoute, UnauthenticatedRoute, AuthProvider } from "../../authentication/Auth";

// CSS Styles for the Mobile Warning Popup
const styles = `
    .mobile-warning-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .popup-content {
        text-align: center;
    }

    .spinnerContainerStyle {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;
    }
`;

// Popup component for mobile warning
const MobileWarningPopup = () => (
    <div className="mobile-warning-popup">
        <div className="popup-content">
            <h2>Mobile site under construction!</h2>
        </div>
        <div className="spinnerContainerStyle">
            <TrainLoader />
        </div>
        <div className="popup-content">
            <p>View this page from a computer to access the tools.</p>
        </div>
    </div>
);

function App() {
    // Inject the CSS styles into the document head
    React.useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    // Conditional rendering logic for mobile warning
    if ((isMobile || isTablet) && !window.location.pathname.startsWith('/apps/clearance-calculator')) {
        return <MobileWarningPopup />;
    }

    // Normal (web) application rendering
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
