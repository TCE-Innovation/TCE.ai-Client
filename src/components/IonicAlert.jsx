import React from 'react';
import { IonAlert } from '@ionic/react';

// Generic component for Ionic alerts that can be reused throughout the app
const IonicAlert = ({ 
    isOpen, 
    onDidDismiss, 
    header, 
    subHeader,
    message, 
    cssClass = '', 
    buttons = [{text: 'OK'}]
}) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            header={header}
            subHeader={subHeader}
            message={message}
            cssClass={`ios-alert ${cssClass}`}
            buttons={buttons}
            translucent={true}
            animated={true}
        />
    );
};

export default IonicAlert;
