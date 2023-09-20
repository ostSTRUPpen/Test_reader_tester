<script lang="ts">
	import { base } from '$app/paths';
	import Question from '$lib/components/Question.svelte';
	import UploadJsonFile from '$lib/components/UploadJSONFile.svelte';

	let jsonData: Array<UsedTypes.questionObject> = [];
	let allData: Array<UsedTypes.questionObject> = [];

	$: {
		allData = jsonData;
	}

	/**
	 * //TODO
	 * Vytvořit stránku pro zobrazení otázek (nahraje se soubor a zobrazí otázky)
	 */
</script>

<details>
	<summary>Návod k použití</summary>
	<p>
		Nejdříve je potřeba soubor "save_file.json", který lze vytvořit a stáhnout <a
			href="{base}/data_creation">zde</a
		>!
	</p>
	<ol>
		<li>Nahrajte soubor "save_file.json"</li>
		<li>Zaškrtnutí odpovědi u otázky znamená zakroužkování v případě skutečného testu</li>
		<li>
			Pro vyhodnocení nezaškrtnutých otázek (buď mají zůstat nezaškrtnuté nebo mají být zaškrtnuté)
			klikněte na zkontrolovat
		</li>
	</ol>
</details>
<UploadJsonFile bind:data={jsonData} />

{#each allData as data}
	<Question {data} />
{/each}
