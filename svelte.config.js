import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preproces
	preprocess: preprocess(),

	kit: {
		target: '#svelte'
	}
};

export default config;
