<script lang="ts">
    import Base from "./Base.svelte";

    export let value: string | undefined;
    export let title: string;
    export let optional: boolean = false
    export let description: string;
    export let validator: ((v: string|undefined) => undefined|string) | undefined = undefined;
    let error: string|undefined = undefined

    let internalValue = value == undefined ? "" : value;


    function update() {
        if (validator) {
            error = validator(value)
        }
        if (optional && value == "") value = undefined
        else value = internalValue
    }
</script>

<Base {optional} {title} {description} {error}>
    <input type="text"
        bind:value={internalValue}
        on:change={update} />
</Base>
