<script lang="ts">
	// Tesseract
	import Tesseract from 'tesseract.js';

	const questionRegex = /^\d{1,4}. .*:$/;
	const answerRegex = /^[abcdABCD]\) .*$/;
	const rightAnswerRegex = /^[ABCD]$/;

	let stateText = 'Čekám na obrázek';

	let readingProgress = 0;
	export let processedData: Array<UsedTypes.questionObject> = [];

	$: {
		console.log(processedData);
	}

	// OCR image
	function readImage(imgURL: string) {
		stateText = 'Čtu text';
		Tesseract.recognize(imgURL, 'ces', {
			logger: (m) => (readingProgress = m.progress * 100)
		}).then(({ data: { text } }) => {
			processedData = functionToProcessData(text);
			stateText = 'Hotovo';
		});
	}
	// Načtení obrázku
	function loadFile($ev: Event) {
		//TODO možná předělat na foreach (https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)
		stateText = 'Načítám obrázek';
		//@ts-ignore
		const image: HTMLImageElement = document.getElementById('output');
		//@ts-ignore
		image.src = URL.createObjectURL($ev.target.files[0]);
		readImage(image?.src);
	}
	// Zpracování textu
	function functionToProcessData(rawReadData: string): Array<UsedTypes.questionObject> {
		stateText = 'Upravuji text';
		let sentences = rawReadData.split('\n');
		/**
		 * 454. Zásobní látkou hub je:
		 * a) škrob a glykogen
		 * B) glykogen a olej
		 * c) olej a škrob
		 * d) škrob, olej a glykoge
		 * 455. Spojováním buněk hub (Fungi) vznikají:
		 * A) nepravá pletiva
		 * B) hyfy
		 * C) mycelium
		 * D) pseudoparenchym
		 */

		let listOfQuestions: Array<UsedTypes.questionObject> = [];
		let objectPointer = -1;
		let answerPointer = 1;
		let questionObject: UsedTypes.questionObject;
		for (let i = 0; i < sentences.length; i++) {
			//@ts-ignore
			questionObject = {
				q: '',
				a1: '',
				a2: '',
				a3: '',
				a4: '',
				rightnes: []
			};
			if (sentences[i].length <= 1) {
				continue;
			}
			if (questionRegex.test(sentences[i])) {
				answerPointer = 1;
				objectPointer++;
				questionObject.q = sentences[i];
				listOfQuestions.push(questionObject);
			} else if (answerRegex.test(sentences[i])) {
				if (rightAnswerRegex.test(sentences[i][0])) {
					listOfQuestions[objectPointer].rightnes.push(true);
				} else {
					listOfQuestions[objectPointer].rightnes.push(false);
				}
				listOfQuestions[objectPointer][`a${answerPointer}`] = sentences[i].replace(/^\w\) /, '');
				answerPointer++;
			} else {
				console.error(sentences[i]);
			}
		}
		return listOfQuestions;
	}
</script>

<div id="outer">
	<div id="inner">
		<br />
		<label id="input_label" for="file" style="cursor: pointer;">Nahrát obrázek</label>
		<input
			type="file"
			accept="image/*"
			name="image"
			id="file"
			on:change={loadFile}
			style="display: none;"
		/>
		<br />
		<br />
		<label for="output">Náhled:</label>
		<br />
		<img id="output" alt="Náhled nahraného obrázku" width="500" />
		<br />
		<progress id="fileHandlingProgress" value={readingProgress} max="100"
			>{readingProgress}%</progress
		>
		<p id="status">{stateText}</p>
	</div>
</div>

<style>
	#input_label {
		outline: 1px solid black;
	}
	#outer {
		outline: 1px solid black;
	}
	#inner {
		padding-left: 10px;
	}
</style>
