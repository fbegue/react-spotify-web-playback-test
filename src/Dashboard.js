import React, {useState,useEffect} from 'react';
import Polly from './polly/index';

function Main(props) {

	let api_address = null;
	if(window.location.host === "soundfound.io" ){
		api_address = "https://api.soundfound.io"
	}else if(window.location.host === "sweet-trifle-5834dc.netlify.app" ){
		api_address = "https://api.soundfound.io"
	}else{
		api_address = "http://localhost:8888"
	}

	//note: override
	api_address = "https://api.soundfound.io"
	// function randomNotification(rec) {
	// 	new Notification("getPlaying", {body:JSON.stringify(rec)});
	// }

	const ask = () =>{
		Notification.requestPermission().then((result) => {
			if (result === 'granted') {
				setAccess(result)
				new Notification("access", {body:result});
			}
		});
	}

	const [playing, setPlaying] = useState(null);
	const [access, setAccess] = useState(false);
	const [speechText, setSpeechText] = useState(false);

	var get =  function(){
		return new Promise(function(done, fail) {
			// console.log("code for accessToken fetch",code);
			fetch(api_address + '/getPlaying', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				headers: {
					'Content-Type': 'application/json'
				},
				// body: JSON.stringify({code:code})
			})
				.then(res => res.json())
				.then(function(res){
					console.log("getPlaying response: ",res);
					if(res.track){
						var rec = 	{id:res.track.item.id,artist: res.track.item.artists[0].name,
							track: res.track.item.name,genres:res.artist.genres,release_date: res.track.item.album.release_date}
						setPlaying(rec)
						done(rec)
					}
					else{
						fail(res)
					}

				},e =>{fail(e)})

		})
	}

	//const [prevId, set] = useState(false);
	var prevId= false;
	var set = (v) =>{prevId = v;}
	useEffect(() => {
		setInterval(function(){
			get()
				.then(_rec =>{
					if(prevId === false){set(_rec.id)}
					console.log("prevId |" + prevId +" |rec| " + _rec.id);
					if(prevId !== _rec.id){
						set(_rec.id)

						// new Notification("getPlaying", {body:JSON.stringify(_rec)})
						//_rec.track + "|" +
						var body =  _rec.release_date + "|" + (_rec.genres.toString() !== "" ? _rec.genres.toString(): "no genres")
						console.log("Notification",body);
						new Notification(_rec.artist, {body:body});
						let text = _rec.artist +"," + _rec.genres.toString()
						//setSpeechText(body)
						// console.log({text})
						setSpeechText(text)
					}else{
						console.log("no change",_rec);
					}
				},e =>{
					console.error("useEffect > get | error",e);
				})
		}, 5000);
	},[]);

	//note: do it once
	useEffect(() => {
			get()
				.then(_rec =>{
					if(prevId === false){set(_rec.id)}
					console.log("prevId |" + prevId +" |rec| " + _rec.id);
					if(prevId !== _rec.id){
						set(_rec.id)

						// new Notification("getPlaying", {body:JSON.stringify(_rec)})
						//_rec.track + "|" +
						var body =  _rec.release_date + "|" + (_rec.genres.toString() !== "" ? _rec.genres.toString(): "no genres")
						console.log("Notification",body);
						new Notification(_rec.artist, {body:body});
						let text = _rec.artist +"," + _rec.genres.toString()
						//setSpeechText(body)
						// console.log({text})
						 setSpeechText(text)
					}else{
						console.log("no change",_rec);
					}
				},e =>{
					console.error("useEffect > get | error",e);
				})
	},[]);




	return(<div>
		logged in
		<Polly speechText={speechText}/>
		{/*{JSON.stringify(params)}*/}
		<button onClick={() =>{ask()}}>ask </button> {access ? 'true':'false'}
		{/*<button onClick={() =>{get()}}>getPlaying</button>*/}
		{playing &&
		<div>
			<div> artist: {playing.artist}</div>
			<div> track: {playing.track}</div>
			<div> release: {playing.release_date}</div>
			{/*<div> id: {playing.id}</div>*/}
			<ul>
				{playing.genres.map((genre) =>
					<li key={genre}>
						{JSON.stringify(genre)}
					</li>
				)}
			</ul>
		</div>
		}
	</div>)
}
export default Main;
