<script lang="ts">
    // Tesseract
    import Tesseract from 'tesseract.js';


    let readingProgress = 0;
    let processedData;

    // OCR image
    function readImage(imgURL: string) {
	Tesseract.recognize(imgURL, 'ces', {
		logger: (m) => readingProgress = m.progress*100
	}).then(({ data: { text } }) => {
		processedData = processData(text)
	});}
    // Načtení obrázku
    function loadFile(event) {
	    const image: HTMLImageElement = document.getElementById('output');
	    image.src = URL.createObjectURL(event.target.files[0]);
        readImage(image?.src)
    };
    // Zpracování textu
    function processData(rawReadData: string){
        let sentences = rawReadData.split("\n")
        //TODO regex, co nejdříve pozná otázku "####. text :""
        //TODO regex, co oddělí písmeno od odpovědi "x)
        //TODO podle kapitalizace x) určí správnou/špatnou odpověď
        //TODO vytvoří objekt, kde bude Otázka, 4 odpovědi (i s písmenem, která budou všechny malá), true/false v závislosti na správnosti odpovědi
        //console.log(sentences)
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
    }
</script>

<header />

<main>
    <p><input type="file"  accept="image/*" name="image" id="file"  on:change={() => loadFile(event)} style="display: none;"></p>
<p><label for="file" style="cursor: pointer;">Upload Image</label></p>
<p><img id="output" width="200" /></p> 
<progress id="readingFile" value={readingProgress} max="100">{readingProgress}%</progress>
</main>
<footer>
	Vytvořil <a href="https://github.com/ostSTRUPpen">ostSTRUPpen</a>
</footer>

<style>
</style>
