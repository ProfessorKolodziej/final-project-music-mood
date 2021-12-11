import SpotifyWebApi from"spotify-web-api-node";import ServerMethods from"spotify-web-api-node/src/server-methods";SpotifyWebApi._addMethods(ServerMethods);var spotifyApi=new SpotifyWebApi({clientId:"bca1beee06c742639a62a7f932b37051",redirectUri:"https://professorkolodziej.github.io/final-project-music-mood/callback/"}),scopes=["user-read-private"],state="final-project",showDialog=!0,responseType="token",authorizeURL=spotifyApi.createAuthorizeURL(scopes,state,showDialog,responseType),loginButton=document.querySelector("#js-login");function logIn(){window.location.href=authorizeURL}null!==loginButton&&loginButton.addEventListener("click",logIn);var queryString=window.location.hash;if(""!==queryString){var code=queryString.split("&")[0].split("=")[1];spotifyApi.setAccessToken(code);var nextURL="https://professorkolodziej.github.io/final-project-music-mood/",nextTitle="Begin the quiz",nextState={additionalInformation:"Authorization granted"};window.history.pushState(nextState,nextTitle,nextURL),loginButton.style.display="none",document.getElementById("dropdown").style.display="none",document.getElementById("choose-mood").style.display="none",document.getElementById("wrapper").style.display="none",document.getElementById("orange-box").style.display="none"}var mood=localStorage.getItem("mood"),randomOffset=Math.floor(500*Math.random());null!==mood&&spotifyApi.searchTracks(mood,{limit:1,offset:randomOffset}).then((function(e){var t=e.body.tracks.items[0],o=document.createElement("img"),n=document.getElementById("trackname"),i=document.getElementById("artistname"),r=document.getElementById("banner");o.setAttribute("src",t.album.images[0].url),o.setAttribute("id","albumStyle"),document.body.appendChild(o),n.innerText="Title: ".concat(t.name),i.innerText="Artist: ".concat(t.artists[0].name),r.innerText="Results"}),(function(e){console.error(e)}));