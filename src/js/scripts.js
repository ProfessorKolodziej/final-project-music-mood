// Add your scripts here
import SpotifyWebApi from 'spotify-web-api-node';
import ServerMethods from 'spotify-web-api-node/src/server-methods';

// Patch missing server methods to client methods
// Fix found in https://github.com/thelinmichael/spotify-web-api-node/issues/342
// eslint-disable-next-line no-underscore-dangle
SpotifyWebApi._addMethods(ServerMethods);

// Create the API object
const spotifyApi = new SpotifyWebApi({
	clientId: 'bca1beee06c742639a62a7f932b37051',
	redirectUri: 'http://localhost:8000/callback/',
});

// Set up the authentication permissions and URL
const scopes = ['user-read-private'];
const state = 'final-project';
const showDialog = true;
const responseType = 'token';

const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, showDialog, responseType);

// Click a button to log in
const loginButton = document.querySelector('#js-login');

function logIn() {
	window.location.href = authorizeURL;
}

loginButton.addEventListener('click', logIn);

// Look for parameters in the URL
const queryString = window.location.hash;

// If there are any parameters in the URL, go ahead
// with granting the authorization code and trimming
// the URL back down
if (queryString !== '') {
	const code = queryString.split('&')[0].split('=')[1];
	spotifyApi.setAccessToken(code);
	// Redirect to the place you'd like to be in nextURL.
	// Right now, this will redirect to your index.html.
	const nextURL = window.location.origin;
	const nextTitle = 'Begin the quiz';
	const nextState = { additionalInformation: 'Authorization granted' };
	window.history.pushState(nextState, nextTitle, nextURL);
	loginButton.style.display = 'none';
	document.getElementById('start-window').style.display = 'none';
	document.getElementById('mood-window').style.display = 'none';
}

/* Get Elvis' albums
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', { limit: 10, offset: 20 }).then(
	// eslint-disable-next-line prefer-arrow-callback
	function (data) {
		console.log('Artist albums', data.body);
	},
	// eslint-disable-next-line prefer-arrow-callback
	function (err) {
		console.error(err);
	},
);
*/

const body = document.querySelector("body");
const emoji = document.querySelector(".slide-emoji");
const input = document.querySelector("input");
const bar = document.querySelector(".progress-bar");
const thumb = document.querySelector(".thumb");
input.oninput = () => {
	let sliderValue = input.value;
	thumb.style.left = sliderValue + '%';
	bar.style.width = sliderValue + '%';
	if (sliderValue < 20) {
		emoji.style.marginTop = "0px";
		body.classList.add("angry");
		body.classList.remove("confuse");
		body.classList.remove("like");
	}
	if (sliderValue >= 20) {
		emoji.style.marginTop = "-140px";
		body.classList.add("confuse");
		body.classList.remove("angry");
		body.classList.remove("like");
	}
	if (sliderValue >= 40) {
		emoji.style.marginTop = "-280px";
	}
	if (sliderValue >= 60) {
		emoji.style.marginTop = "-420px";
		body.classList.add("like");
		body.classList.remove("confuse");
		body.classList.remove("angry");
	}
	if (sliderValue >= 80) {
		emoji.style.marginTop = "-560px";
	}
}

let sliderValue = input.value;
const randomOffset = Math.floor(Math.random() * 200);

spotifyApi.searchTracks('Sad Music', { limit: 1, offset: randomOffset }).then(
	function(data) {
		var track = data.body.tracks.items[0];
		console.log('album cover', track.album.images[0]);
		console.log('track name', track.name);
		const albumCover = document.createElement('img');
		const trackName = document.createElement('p');
		albumCover.setAttribute('src', track.album.images[0].url);
		trackName.setAttribute('name', track.name)
		document.body.appendChild(albumCover);
		document.body.appendChild(trackName);
	},
	// eslint-disable-next-line prefer-arrow-callback
	function(err) {
		console.error(err);
	 },
);


// PSUEDOCODE
/* function returnTrack() {
		let moodSelection = document.querySelector('button');
		if (moodSelection == happy) {
			return random track from happy playlist
		}
		else if (moodSelect == sad){
			return random track from sad playlist
		}
	}

	return returnTrack.albumCover
	return returnTrack.songTitle
	*/
