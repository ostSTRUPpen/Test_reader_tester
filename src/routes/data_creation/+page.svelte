<script lang="ts">
	import ImageLoading from '$lib/components/ImageLoading.svelte';
	import UploadJsonFile from '$lib/components/UploadJSONFile.svelte';

	let imageData: Array<UsedTypes.questionObject> = [];
	let jsonData: Array<UsedTypes.questionObject> = [];
	let allData: Array<UsedTypes.questionObject> = [];
	let hidden = true;

	function updateDownload() {
		if (allData.length > 0) {
			hidden = false;
		} else {
			hidden = true;
		}
	}
	$: {
		allData.push(...imageData);
		updateDownload();
	}
	$: {
		allData.unshift(...jsonData);
		updateDownload();
	}
	/**
	 * //TODO
	 * Vytvořit stránku pro zobrazení otázek (nahraje se soubor a zobrazí otázky)
	 */
	function download() {
		let data, file, filename, link;
		file = 'data:text/json;charset=utf-8,' + JSON.stringify(allData);
		filename = 'save_file.json';
		data = encodeURI(file);
		link = document.createElement('a');
		link.setAttribute('href', data);
		link.setAttribute('download', filename);
		link.click();
	}
</script>

<details>
	<summary>Návod k použití</summary>
	<p>
		Nejdříve je nutné naskenovat (minimálně pomocí skeneru v mobilu, nejlépe pomocí skutečného
		skeneru) jednotlivé papíry a oříznout je, tak aby jeden obrázek odpovídal jednomu sloupci
		otázek.
	</p>
	<ol start="0">
		<li>
			Pokud máte soubor "save_file.json", tak jej nahrajte a teprve poté pokračujte na další kroky
		</li>
		<li>Nahrajte obrázek a vyčkejte, dokud se stav obrázku nezmění na "Hotovo"</li>
		<li>
			Pokud došlo při čtení k nějaké chybě, tak je vypsaná v konzoli a je potřeba ji opravit před
			znovu nahráním obrázku
		</li>
		<li>
			Pokud jste s nahráním obrázku spokojen, tak je možné nahrát další pomocí kliknutí na tlačítko
			pro nahrání obrázku
		</li>
		<li>Když máte nahrané všechny obrázky, klikněte na "Stáhnout save_file.json".</li>
		<li>Po stažení "save_file.json" se můžete přesunout na <a href="/questions">otázky</a></li>
	</ol>
</details>

<ImageLoading bind:processedData={imageData} />

<!-- svelte-ignore a11y-invalid-attribute -->
<button id="download" on:click={download} {hidden}>Stáhnout save_file.json</button>
<UploadJsonFile bind:data={jsonData} />

<style>
</style>
