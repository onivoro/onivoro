<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/packages.json');

		if (res.ok) {
			const packages = await res.json();

            console.warn(packages);

			return {
				props: { packages }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};
</script>

<script lang="ts">
    import type { Package } from '@onivoro/isomorphic-onivoro';
    export let packages: Package[];
</script>

<h1 class="hero oni">{packages.length} Packages</h1>

<ul>
    {#each packages as p}
        <li>{p.packageName}</li>
    {/each}
</ul>
