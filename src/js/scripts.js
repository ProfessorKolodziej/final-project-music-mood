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
	// document.getElementsById('label').innerText = 'Your Music Recommendation';
	document.getElementById('start-window').style.display = 'none';
	document.getElementById('mood-window').style.display = 'none';
	document.getElementById('orange-box').style.display = 'none';
	// document.getElementById('drop-down').style.display = 'none';
}

// var input = document.getElementById("mood-selection").textContent;

const randomOffset = Math.floor(Math.random() * 500);

spotifyApi.searchTracks('sad', { limit: 1, offset: randomOffset }).then(
	function (data) {
		const track = data.body.tracks.items[0];
		const albumCover = document.createElement('img');
		// const element = document.getElementById('jsfill');
		albumCover.setAttribute('src', track.album.images[0].url);
		document.body.appendChild(albumCover);
		// element.innerText = track.name;
		// alert(track.name);
	},
	// eslint-disable-next-line prefer-arrow-callback
	function(err) {
		console.error(err);
	},
);

/* if (input == 'sad') {
	spotifyApi.searchTracks('sad music', { limit: 1, offset: randomOffset }).then(
		function(data) {
			var track = data.body.tracks.items[0];
			console.log('album cover', track.album.images[0]);
			console.log('track name', track.name);
			const albumCover = document.createElement('img');
			const element = document.getElementById("track-name");
			albumCover.setAttribute('src', track.album.images[0].url);
			document.body.appendChild(albumCover);
			element.innerHTML(trackName);
		},
		// eslint-disable-next-line prefer-arrow-callback
		function(err) {
			console.error(err);
		},
		);
	}
if (input == 'happy') {
	spotifyApi.searchTracks('happy music', { limit: 1, offset: randomOffset }).then(
		function(data) {
			var track = data.body.tracks.items[0];
			console.log('album cover', track.album.images[0]);
			console.log('track name', track.name);
			const albumCover = document.createElement('img');
			albumCover.setAttribute('src', track.album.images[0].url);
			document.body.appendChild(albumCover);
			document.getElementById("track-name").innerHTML = track.name;
		},
		// eslint-disable-next-line prefer-arrow-callback
		function(err) {
			console.error(err);
		},
		);
	}
*/
