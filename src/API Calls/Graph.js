export function getUserProfilePic(accessToken) {      
    // get user profile picture
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);
    const options = {
      method: "GET",
      headers: headers,
    };
    const graphEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";
    return fetch(graphEndpoint, options)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        return url;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  