// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace UsedTypes {
		type questionObject = {
			[q: string]: string;
			[a1: string]: string;
			[a2: string]: string;
			[a3: string]: string;
			[a4: string]: string;
			rightnes: Array<boolean>;
		};
	}
}

export {};
