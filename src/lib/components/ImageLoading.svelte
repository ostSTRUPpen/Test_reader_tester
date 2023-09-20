<script lang="ts">
	// Tesseract
	import Tesseract from 'tesseract.js';

	const questionRegex = /^\d{1,4}. .*:$/;
	const answerRegex = /^[abcdABCD]\) .*$/;
	const rightAnswerRegex = /^[ABCD]$/;

	let stateText = 'Čekám na obrázek';

	let issues: number = 0;
	let showErrors: boolean = false;

	let readingProgress = 0;
	export let processedData: Array<UsedTypes.questionObject> = [];

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
		issues = 0;
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
				rightness: []
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
				if (answerPointer > 4) continue;
				if (rightAnswerRegex.test(sentences[i][0])) {
					listOfQuestions[objectPointer].rightness.push(true);
				} else {
					listOfQuestions[objectPointer].rightness.push(false);
				}
				listOfQuestions[objectPointer][`a${answerPointer}`] = sentences[i].replace(/^\w\) /, '');
				answerPointer++;
			} else {
				issues++;
				console.error(sentences[i]);
			}
		}
		return listOfQuestions;
	}
	$: {
		if (issues > 0) {
			showErrors = true;
		} else {
			showErrors = false;
		}
	}
</script>

<div id="outer">
	<div id="inner">
		<br />
		<label id="input_label" for="file" style="cursor: pointer;">Nahrajte obrázek (png/jpg)</label>
		<br />
		<input type="file" accept="image/*" name="image" id="file" on:change={loadFile} />
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
		<p id="errorDisplay" hidden={!showErrors}><b>Došlo k chybě! ({issues}x)</b></p>
	</div>
</div>

<style>
	#outer {
		outline: 1px solid black;
	}
	#inner {
		padding-left: 10px;
	}
	#errorDisplay {
		color: red;
		font-size: larger;
	}
</style>
