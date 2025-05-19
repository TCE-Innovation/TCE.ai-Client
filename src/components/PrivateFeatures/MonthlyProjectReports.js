import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../authentication/Auth";
import { getPBILog } from "../../data/Airtable"; // adjust path if needed
import TrainLoader from '../General/TrainLoader';

const MonthlyProjectReports = () => {
    const { userEmail } = useContext(AuthContext);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true);

    const iframeSrc = "https://airtable.com/embed/appSO430pIft8OrUv/shrMrtuP2N3969Xh2"; // your public link

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const results = await getPBILog('monthly_project_reports');
                setHasAccess(results.length > 0);
            } catch (error) {
                console.error('Error checking provisioning:', error);
                setHasAccess(false);
            } finally {
                setLoading(false);
            }
        };

        checkAccess();
    }, []);

    if (loading) return <TrainLoader />;

    if (!hasAccess) {
        return (
            <div style={{ textAlign: "center", padding: "2rem" }}>
                <h2>You do not have access to Monthly Project Reports.</h2>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", marginTop: 20 }}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <iframe
                    onLoad={() => setIframeLoaded(true)}
                    className="airtable-embed airtable-dynamic-height"
                    src={iframeSrc}
                    width="100%"
                    height="750px"
                    title="Monthly Project Reports"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default MonthlyProjectReports;
