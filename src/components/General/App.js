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

    body {
        padding-top: constant(safe-area-inset-top); /* iOS 11.2+ */
        padding-top: env(safe-area-inset-top); /* iOS 11.0-11.1 */
        background-color: #F1FFFF; /* Set your background color */
    }
`;

// Popup component for mobile warning
const MobileWarningPopup = () => (
    <div className="train-div">
        <div className="mobile-warning-popup">
            <div className="popup-content">
                <h2>Mobile site under construction!</h2>
                <p>View this page from a computer to access the tools.</p>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <TrainLoader />
            </div>
            </div>
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

                    <Route path='/apps/clearance-calculator' element={<ClearancePWA />} />

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
