import React, { useState } from 'react';
import './App.css';
import JsonViewer from './components/JsonViewer';

function App() {
	const [ configFile, setConfigFile ] = useState();
	const [ configJson, setConfigJson ] = useState();
	const [ schemeFile, setSchemeFile ] = useState();
	const [ schemeJson, setSchemeJson ] = useState();

	const handleFileSubmit = async e => {
		e.preventDefault();
		var files = document.getElementById("configFile").files;
		var schemeFiles = document.getElementById("configSchemeFile").files;
		if (files && files.length > 0) {
			var file = files[0];
			setConfigFile(file);
			
			const reader = new FileReader()
			reader.onload = async (e) => {
				const text = (e.target.result)
				var jsonText = JSON.parse(text)
				setConfigJson(jsonText);
			};
			reader.readAsText(file);

		}

		if(schemeFiles && schemeFiles.length > 0){
			var schemeFile = schemeFiles[0];
			setSchemeFile(schemeFile);
			const reader2 = new FileReader()
			reader2.onload = async (e2) => {
				const text2 = (e2.target.result)
				var jsonText2 = JSON.parse(text2);
				setSchemeJson(jsonText2);
			};
			reader2.readAsText(schemeFile);
		}

	}

	function clearSelectedFile(){
		setConfigFile(null)
		setConfigJson(null);
		setSchemeFile(null);
		setSchemeJson(null);
	}

	if (configFile && configJson) {
		return (
			<JsonViewer filename={configFile.name} configJosn={configJson} schemeJson={schemeJson} backAction={clearSelectedFile}/>
		)
	}

	return (
		<div className="App">
			<h1> JSON Form Editor </h1>
			<form onSubmit={handleFileSubmit}>
				<div className="files-electoin">
					JSON File : <input id="configFile" type="file" accept="application/JSON"></input>
				</div>
				<div  className="files-electoin">
					Scheme File : <input id="configSchemeFile" type="file" accept="application/JSON"></input>
				</div>
				<button type="submit" className="fileSubmitCls">Load</button>
			</form>
		</div>
	);
}

export default App;
