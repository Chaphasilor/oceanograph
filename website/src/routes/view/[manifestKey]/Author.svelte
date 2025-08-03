<script lang="ts">
    import type { Author } from "shared/parser/types";

    export let author: Author;
</script>


<div>
    <h4>
        {#if author.urls && author.urls.length == 1}
            <a href={author.urls[0].url.toString()}>{author.name}</a>
        {:else}
            {author.name}
        {/if}
    </h4>
    {#if author.urls && author.urls.length > 1}
        <ul>
            {#each author.urls as url}
                <li>
                    <a href="{url.url.toString()}">{url.type}</a>
                </li>
            {/each}
        </ul>
    {/if}
</div>
