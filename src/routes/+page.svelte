<script lang="ts">
	import ImageLoading from '$lib/components/ImageLoading.svelte';

	let imageData: Array<UsedTypes.questionObject> = [];
	let allData: Array<UsedTypes.questionObject> = [];
	let hidden = true;
	$: {
		allData.push(...imageData);
		console.log(allData);

		if (allData.length > 0) {
			hidden = false;
		} else {
			hidden = true;
		}
	}
	/**
	 * //TODO
	
	 * Umožnit nahrání json souboru - přidání nových dat z obrázků k json atd...
	 * Vytvořit stránku pro zobrazení otázek (nahraje se soubor a zobrazí otázky)
	 */
	function download() {
		let data, file, filename, link;
		file = 'data:text/json;charset=utf-8,' + JSON.stringify(allData);

		/*        var file = {
            data: stockData
        };
        if (file == null) return;
*/
		filename = 'save_file.json';

		//        if (!file.match(/^data:text\/file/i)) {
		//           file = 'data:text/json;charset=utf-8,' + file;
		//       }
		data = encodeURI(file);

		link = document.createElement('a');
		link.setAttribute('href', data);
		link.setAttribute('download', filename);
		link.click();
	}
</script>

<header />

<main id="main">
	<ImageLoading bind:processedData={imageData} />

	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="#" on:click={download} {hidden}>Download JSON</a>
</main>
<footer>
	Vytvořil <a href="https://github.com/ostSTRUPpen">ostSTRUPpen</a>
</footer>
