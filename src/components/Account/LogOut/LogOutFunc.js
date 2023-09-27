import { useMsal } from "@azure/msal-react";

export function useMicrosoftSignOut() {
    const { instance } = useMsal();

    async function MicrosoftSignOut() {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return MicrosoftSignOut;
}