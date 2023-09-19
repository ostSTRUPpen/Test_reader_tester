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

<ImageLoading bind:processedData={imageData} />

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="#" on:click={download} {hidden}>Download JSON</a>
<UploadJsonFile bind:data={jsonData} />
