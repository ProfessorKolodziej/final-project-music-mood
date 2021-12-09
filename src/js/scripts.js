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

if (loginButton !== null) {
	loginButton.addEventListener('click', logIn);
}

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
	document.getElementById('dropdown').style.display = 'none';
	document.getElementById('choose-mood').style.display = 'none';
	document.getElementById('wrapper').style.display = 'none';
	document.getElementById('orange-box').style.display = 'none';
	// document.getElementById('drop-down').style.display = 'none';
}

const mood = localStorage.getItem('mood');
const randomOffset = Math.floor(Math.random() * 500);
if (mood !== null) {
	spotifyApi.searchTracks(mood, { limit: 1, offset: randomOffset }).then(
		(data) => {
			const track = data.body.tracks.items[0];
			const albumCover = document.createElement('img');
			const trackname = document.getElementById('trackname');
			const artistname = document.getElementById('artistname');
			albumCover.setAttribute('src', track.album.images[0].url);
			albumCover.setAttribute('id', 'albumStyle');
			document.body.appendChild(albumCover);
			const stringTitle = 'Title: ';
			const stringArtist = 'Artist: ';
			trackname.innerText = stringTitle.concat(track.name);
			artistname.innerText = stringArtist.concat(track.artists[0].name);
		},
		// eslint-disable-next-line prefer-arrow-callback, func-names
		function (err) {
			// eslint-disable-next-line no-console
			console.error(err);
		},
	);
}

/* const repoRow = `
				<tr class="repo">
					<td><a href="${repo.html_url}">${repoName}</a></td>
					<td><a href="${repo.html_url}/releases/tag/${repoInfo.version}">${repoInfo.version}</td>
					<td>?</td>
					<td>?</td>
					<td>${foundationVersion}</td>
				</tr>
				`;

				document.querySelector('#version-manager').insertAdjacentHTML('beforeend', repoRow);
*/
