<script lang="ts">
	export let data: Array<UsedTypes.questionObject> = [];

	let stateText = 'Čekám na soubor';

	function onChange($ev: Event) {
		stateText = 'Načítám soubor';
		var reader = new FileReader();
		reader.onload = onReaderLoad;
		//@ts-ignore
		reader.readAsText($ev.target.files[0]);
	}

	function onReaderLoad($ev: Event) {
		stateText = 'Čtu data';
		//@ts-ignore
		const obj = JSON.parse($ev.target.result);
		data = obj;
		stateText = 'Hotovo';
	}
</script>

<div id="outer">
	<div id="inner">
		<br />
		<label id="input_label" for="input">Nahrajte JSON soubor (save_file.json)</label> <br />
		<input type="file" id="input" on:change={onChange} />
		<p id="status">{stateText}</p>
	</div>
</div>

<style>
	#outer {
		outline: 1px solid black;
	}
	#inner {
		padding-left: 10px;
	}
</style>
