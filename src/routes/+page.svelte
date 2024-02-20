<script lang="ts">
    import BaseForm from "$lib/components/BaseForm.svelte";
import Script from "$lib/components/Script.svelte";
    import { PROJECT_TYPES, createConceptPropDirs, createEditorialDirs, createMotionDirs, createScriptDirs, createStoryDirs } from "$lib/scaffolding/scaffold";

    const prevTypeStorage = localStorage.getItem('scaffoldType')
    const prevType = prevTypeStorage ? prevTypeStorage as unknown as typeof PROJECT_TYPES[number] : null
    let projectTypeSelection: typeof PROJECT_TYPES[number] = prevType ? prevType : PROJECT_TYPES[0];
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
    
    { #if projectTypeSelection === 'Concept-Props'}
        <BaseForm scaffoldType={ projectTypeSelection } scaffoldHandler={createConceptPropDirs} />
    { /if }
    { #if projectTypeSelection === 'Editorial'}
        <BaseForm scaffoldType={ projectTypeSelection } scaffoldHandler={createEditorialDirs} />
    { /if }
    { #if projectTypeSelection === 'Motion'}
        <BaseForm scaffoldType={ projectTypeSelection } scaffoldHandler={createMotionDirs} />
    { /if }
    { #if projectTypeSelection === 'Script'}
        <BaseForm scaffoldType={projectTypeSelection} scaffoldHandler={createScriptDirs} />
    { /if }
    { #if projectTypeSelection === 'Story'}
        <BaseForm scaffoldType={ projectTypeSelection } scaffoldHandler={createStoryDirs} />
    { /if }

</div>