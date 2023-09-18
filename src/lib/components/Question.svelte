<script lang="ts">
	export let info: UsedTypes.questionObject;
	let answers: Array<boolean> = [false, false, false, false];
</script>

<div>
	<h3><b>{info.q}</b></h3>
	<ol>
		<li prefix="a)">{info.a1} <input type="checkbox" bind:checked={answers[0]} /></li>
		<li prefix="b)">{info.a2} <input type="checkbox" bind:checked={answers[1]} /></li>
		<li prefix="c)">{info.a3} <input type="checkbox" bind:checked={answers[2]} /></li>
		<li prefix="d)">{info.a4} <input type="checkbox" bind:checked={answers[3]} /></li>
	</ol>
</div>
