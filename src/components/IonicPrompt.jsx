import React from 'react';
import { IonAlert } from '@ionic/react';

const IonicPrompt = ({
    isOpen,
    onDidDismiss,
    header,
    message,
    placeholder = '',
    value = '',
    cssClass = '',
    onIonChange,
    buttons
}) => {
    return (
        <IonAlert
            isOpen={isOpen}
            onDidDismiss={onDidDismiss}
            header={header}
            message={message}
            inputs={[
                {
                    name: 'input',
                    type: 'text',
                    placeholder: placeholder,
                    value: value,
                }
            ]}
            buttons={buttons}
            translucent={true}
            animated={true}
            cssClass={`ios-prompt ${cssClass}`}
        />
    );
};

export default IonicPrompt;
