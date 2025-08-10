<script lang="ts">
    export let title: string
    export let description: string
    export let error: string|undefined = undefined
    export let optional: boolean = false
</script>


{#if title == "" && description == ""}
    <div class:err={error!=undefined}>
        <slot />
    </div>
{:else}
    <div class="gd">
        <div>
            {#if error}
                <p class="err">{error}</p>
            {/if}
            <h2>
                {title}
                {#if !optional}
                    <p class="opt">*</p>
                {/if}
            </h2>
            {#if description}
                <p>{description}</p>
            {/if}
        </div>
        <div>
            <slot />
        </div>
    </div>
{/if}


<style lang="scss">
    .opt {
        color: red;
        display: inline;
    }
    .gd {
        display: grid;
        grid-template-columns: 1fr auto;
    }
    .err {
        // color: red
        outline: 2px red solid;
    }
    div {
        padding: 10px;
        border-radius: 10px;
        margin: 5px;
        background-color: rgba(0, 0, 0, 0.09);
    }
</style>
