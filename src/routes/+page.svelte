<script lang="ts">
	import Tesseract from 'tesseract.js';
	Tesseract.recognize('https://cdn.discordapp.com/attachments/769169118980734996/1153043192065831043/20230917_200524.jpg', 'ces', {
		logger: (m) => console.log(m)
	}).then(({ data: { text } }) => {
		console.log(text);
	});
</script>

<header />

<main />
<footer>
	Vytvořil <a href="https://github.com/ostSTRUPpen">ostSTRUPpen</a>
</footer>

<style>
</style>
