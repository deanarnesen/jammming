
const clientID = '79b5efd0c9d344a2ab856304996f7255'
const redirectURI = 'http://localhost/3000';
let expireSeconds = 0;
let accessToken;
let responseURL;

class Spotify {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        let url =
            'https://accounts.spotify.com/authorize?' +
            'client_id=' + clientID + '&' +
            'response_type=token' + '&' +
            'redirect_uri=' + redirectURI;

        fetch(url)
            .then(res => res.json())
            .then(
                (data) => {
                    responseURL = window.location.href;
                }
            )

        const urlParams = new URLSearchParams(responseURL);
        accessToken = urlParams.get('access_token');
        expireSeconds = urlParams.get('expires_in');

        window.setTimeout(() => accessToken = '', expireSeconds * 1000);
        window.history.pushState('Access Token', null, '/');
        window.history.pushState({}, document.title, "/" + 'localhost:3000/' );
        const newParams = new URLSearchParams(window.location.href);
        if(!urlParams.get('access_token')) {
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }

    }
}

export { Spotify }