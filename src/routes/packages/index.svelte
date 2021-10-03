<h1 class="hero oni">Packages</h1>
<ul>
    {#each packages as p}
        {p}
    {/each}
</ul>

<script lang="ts">
    export let packages: string[] = ['server-process', 'server-disk'];
</script>
