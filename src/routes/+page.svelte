<script lang="ts">
    import { PROJECT_TYPES } from "$lib/scaffolding/scaffold";


    let projectTypeSelection = PROJECT_TYPES[0];
    const projectTypes = [...PROJECT_TYPES]

    const handleScaffoldCreationAttempt = () => {
        throw new Error("Function not implemented.");
    }

</script>
<form on:submit|preventDefault={ handleScaffoldCreationAttempt } class={`max-w-2xl flex flex-col justify-center items-center`} autocomplete="off">
    <label class="label">
        <span class="pl-2">Tipo de proyecto</span>
        <select class="select" bind:value={ projectTypeSelection }>
            { #each projectTypes as tipo }
            <option value={ tipo }>{ tipo }</option>
            { /each }
        </select>
    </label>
</form>
