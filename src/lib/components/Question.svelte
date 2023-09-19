<script lang="ts">
	export let data: UsedTypes.questionObject;
	let answers: Array<boolean> = [false, false, false, false];
	let answerCorrectness: Array<string> = ['unk', 'unk', 'unk', 'unk'];

	function checkCorrectness(answerNumber: number | string) {
		if (typeof answerNumber === 'string') {
			for (let i = 0; i < 4; i++) {
				if (answers[i] !== data.rightness[i]) {
					answerCorrectness[i] = 'w';
				} else {
					answerCorrectness[i] = 'r';
				}
			}
		} else {
			if (answers[answerNumber] !== data.rightness[answerNumber]) {
				answerCorrectness[answerNumber] = 'w';
			} else {
				answerCorrectness[answerNumber] = 'r';
			}
		}
	}
</script>

<div>
	<h3><b>{data.q}</b></h3>
	<ol>
		<li prefix="a)" class={answerCorrectness[0]}>
			{data.a1}
			<input type="checkbox" bind:checked={answers[0]} on:change={() => checkCorrectness(0)} />
		</li>
		<li prefix="b)" class={answerCorrectness[1]}>
			{data.a2}
			<input type="checkbox" bind:checked={answers[1]} on:change={() => checkCorrectness(1)} />
		</li>
		<li prefix="c)" class={answerCorrectness[2]}>
			{data.a3}
			<input type="checkbox" bind:checked={answers[2]} on:change={() => checkCorrectness(2)} />
		</li>
		<li prefix="d)" class={answerCorrectness[3]}>
			{data.a4}
			<input type="checkbox" bind:checked={answers[3]} on:change={() => checkCorrectness(3)} />
		</li>
	</ol>
	<button on:click={() => checkCorrectness('everything')}>Zkontrolovat</button>
</div>

<style>
	div {
		width: fit-content;
	}
	.w {
		background-color: rgba(255, 78, 78, 0.383);
	}
	.r {
		background-color: rgba(4, 255, 4, 0.534);
	}
</style>
