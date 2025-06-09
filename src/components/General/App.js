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
import ClearancePWA from '../PublicFeatures/ClearancePWA/ClearancePWA';

//AUTH
import { AuthenticatedRoute, UnauthenticatedRoute, AuthProvider } from "../../authentication/Auth";

// CSS Styles for the Mobile Warning Popup
const styles = `
/* Assuming this is in a CSS file linked to your React component */
body {
    background-image: url('/images/blurred_subway_map.png'); 
    background-size: cover; 
    background-position: center; 
    height: 100vh; 
    margin: 0; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.mobile-warning {
    background-color: rgba(255, 255, 255, 0.50); 
    padding: 25px;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    flex-direction: column; 
    align-items: center;
    min-height: 10vh; 
    min-width: 10vw; 
}

.popup-content h2 {
    font-size: 32px; 
    font-weight: bold; 
}

.popup-content p {
    font-size: 14px; 
}

.popup-content {
    text-align: center;
}

.container-style {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    height: 120px;
    transform: rotate(180deg);
}
`;

// Popup component for mobile warning
const MobileWarningPopup = () => (
    <div className="mobile-warning">
        <img className="container-style" src='/images/gears.gif' alt='gears'></img>
        <div className="popup-content">
            <h2>Under Construction...</h2>
        </div>
        <div className="popup-content">
            <p>We are working to launch a mobile-friendly site soon!</p>
        </div>
    </div>
);

function App() { 
    // Inject the CSS styles into the document head conditionally
    React.useEffect(() => {
        if (isMobile || isTablet) {
            const styleTag = document.createElement('style');
            styleTag.textContent = styles;
            document.head.appendChild(styleTag);
            return () => {
                document.head.removeChild(styleTag);
            };
        }
    }, []);

    // Conditional rendering logic for mobile warning
    if (isMobile || isTablet) {
        return <MobileWarningPopup />;
    }

    // Normal application rendering
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<UnauthenticatedRoute />}>
                        <Route index element={<Gateway />} /> 
                    </Route>

                    <Route exact path='/public' element={<Public />} />

                    <Route exact path='/document' element={<Document />} />
                    
                    <Route path='/sign-in' element={<UnauthenticatedRoute />}>
                        <Route index element={<SignIn />} />
                    </Route>

                    <Route path="/apps/clearance-calculator" element={<ClearancePWA />} />

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