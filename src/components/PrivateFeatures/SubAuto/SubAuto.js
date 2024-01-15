import React, { useState } from 'react';

import styles from './subAuto.module.css';


const SubAuto = () => {
    // State to manage the display of the iframe
    const [showIframe, setShowIframe] = useState(false);

    // Function to toggle the display of the iframe
    const toggleIframeDisplay = () => {
        setShowIframe(!showIframe);
    };

    const goToUrl = () => {
        window.open('https://tce-innovation.github.io/Subcontractor-Automation/#standard-operating-procedure',  '_blank');
    };


    return (
        <div>
            <div className={styles.descriptionText}>   
                <p>
                    The Subcontractor Automation Process is a streamlined and error-minimizing system designed to guide 
                    subcontractors through the completion of vital documentation, specifically the Statement of 
                    Qualification of Subcontractor (SQS) and the Owner Controlled Insurance Program (OCIP) forms. The 
                    process begins with an Initialization step completed by TCE personnel. Next, subcontractors receive a customized link via email 
                    to access the forms. These forms are pre-filled with known good information and utilize an 
                    interface for easy navigation and validation, ensuring that all necessary sections are accurately 
                    completed. Once completed, subcontractors submit the forms and receive a copy of their 
                    submissions via email, while the general contractors receive the finalized documents for review. In 
                    case of any discrepancies, a Correction Form is available to facilitate easy updates. This efficient 
                    system not only ensures accuracy in documentation but also maintains a smooth workflow between 
                    subcontractors and general contractors.
                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={toggleIframeDisplay}>
                    {showIframe ? 'Hide' : 'Show'} Initialization Form
                </button>
                <button onClick={goToUrl}>
                    Standard Operating Procedure
                </button>
            </div>
            <div style={{ display: 'block', marginTop: 20}}>
                {showIframe && (
                    <iframe
                        src="https://tce-innovation.github.io/Subcontractor-Automation/forms/initialization.html"
                        width="100%"
                        height="940px"
                        title="Subcontractor Automation Initialization Form"
                        style={{ background: 'transparent', border: '1px solid #ccc' }}
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default SubAuto;
