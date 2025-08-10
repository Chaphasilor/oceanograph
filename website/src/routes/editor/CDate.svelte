<script lang="ts">
    import Base from "./Base.svelte";

    export let value: Date;
    export let title: string;
    export let description: string;


    $: day = value.getDate()+1;
    $: month = value.getMonth()+1;
    $: year = value.getUTCFullYear();

    let error: undefined|string = undefined

    function update() {
        value = new Date(
            year,
            month-1,
            day-1,
            0, 0, 0, 0
        )

        if (value.toString() == "Invalid Date") error = "Date is not Valid"
        else if (value.getTime() > Date.now()) error = "Date cant be in the future"
        else error = undefined
    }
</script>



<Base {title} {description} {error}>
    day: <input
        placeholder="Day"
        type="number"
        bind:value={day}
        on:change={update} />
    <br>
    month: <input
        placeholder="Month"
        type="number"
        bind:value={month}
        on:change={update} />
    <br>
    year: <input
        placeholder="Year"
        type="number"
        bind:value={year}
        on:change={update} />
</Base>
