<script lang="ts">
    import Script from "$lib/components/Script.svelte";
    import { PROJECT_TYPES } from "$lib/scaffolding/scaffold";

    const prevType = localStorage.getItem('scaffoldType')
    let projectTypeSelection = prevType ? prevType : PROJECT_TYPES[0];
    const projectTypes = [...PROJECT_TYPES]

    const handleTypeSeletion = () => {
        localStorage.setItem('scaffoldType', projectTypeSelection)
    }

</script>
<div class="max-w-2xl flex flex-col h-full overflow-auto">
    <div class="pb-8 w-full">
        <label class="label">
            <span class="pl-2">Tipo de proyecto</span>
            <select class="select w-full" bind:value={ projectTypeSelection } on:change={ handleTypeSeletion }>
                { #each projectTypes as tipo }
                <option value={ tipo }>{ tipo }</option>
                { /each }
            </select>
        </label>
    </div>
    { #if projectTypeSelection === 'Script'}
        <Script />
    { /if }

</div>