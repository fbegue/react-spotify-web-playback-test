import React, { useState,useEffect } from 'react';
import AWS from 'aws-sdk';
import Polly from 'aws-sdk/clients/polly';
import ReactPlayer from 'react-player'



const TextToSpeech = ({speechText}) => {
	//const [text, setText] = useState('');
	const [audioUrl, setAudioUrl] = useState('');
	const [speek, setSpeek] = useState(true);
	const [url, setUrl] = useState("");
	//const handleInputChange = (e) => {
	//	setText(e.target.value);
	//};

	useEffect(async() =>{
		if(speechText){
			console.log("handleClick",speechText)
			await handleClick()
		}

	},[speechText])


	const handleClick = async () => {
		// Initialize the Amazon Polly client
		const polly = new Polly({
			region: 'us-east-2', // Change this to your preferred region
			accessKeyId: 'AKIAUUHLPBEBDLGR7KS4', // Change this to your AWS access key ID
			secretAccessKey: 'lb6AMiVJwijCXM/LFc2vhqEF713WBM37nnJB6Tk+', // Change this to your AWS secret access key

			//			accessKeyId: process.env.accessKeyId, // Change this to your AWS access key ID
			// 			secretAccessKey:  process.env.secretAccessKey, // Change this to your AWS secret access key
		});

		// Set the parameters for the speech synthesis
		const params = {
			Text: speechText,
			OutputFormat: 'mp3',
			VoiceId: 'Joanna', // Change this to your preferred voice
		};

		try {
			// Call the Amazon Polly API to synthesize speech
			const data = await polly.synthesizeSpeech(params).promise();
			const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
			const audioURL = URL.createObjectURL(audioBlob);

			const audio = new Audio(audioURL);
			audio.autoplay = true;
			//audio.play();
			console.log({audio})
			var resp = audio.play();

			if (resp!== undefined) {
				resp.then(_ => {
					console.log("autoplay starts!")
				}).catch(error => {
					console.error(error)
				});
			}

		} catch (err) {
			console.error(err);
		}
	};


	//note: cheat around: DOMException: play() failed because the user didn't interact with the document first
	// useEffect(() => {
	// 	setTimeout(e =>{
	//
	// 		const buttonElement = document.getElementById('myButton');
	// 		console.log("buttonElement",buttonElement)
	// 		if (buttonElement) {
	// 			console.log("click")
	// 			buttonElement.click();
	// 		}
	// 	},1000)
	// },[] );

	return (
		<div>
			{/*<input type="text" value={text} onChange={handleInputChange} />*/}
			<button onClick={() =>setSpeek(!speek)}>Speek {speek ==true?'On':'Off'}</button>

			{url?
				<div>player <ReactPlayer url={url} /></div>:""}
			{/*<button  id="myButton" style={{opacity:0}}/>*/}
			{/*<button onClick={handleClick}>Convert to Speech</button>*/}
			{audioUrl && <audio src={audioUrl} controls />}
		</div>
	);
};

export default TextToSpeech;
