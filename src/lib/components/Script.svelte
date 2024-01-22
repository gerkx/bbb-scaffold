<script lang="ts">
    import { z } from "zod";
    import TextInput from "./TextInput.svelte";
    import { os } from "@neutralinojs/lib";
    import IconFolder from '~icons/mdi/folder'
    import IconFolderMultiple from '~icons/mdi/folder-multiple'

    import { createScriptDirs } from "$lib/scaffolding/scaffold";
    import { getToastStore } from "@skeletonlabs/skeleton";
    
    const toastStore = getToastStore()

    const nameValidator = z.string().min(1);

    const prevSeason = localStorage.getItem('prevSeason')

    export let season = prevSeason ? prevSeason : ""
    let seasonValid = true;
    
    
    export let episode = ''
    let episodeValid = true;
    

    export let title = ''
    let titleValid = true;
    
    const prevPath = localStorage.getItem('prevPath')

    let path: string = prevPath ? prevPath : ''
    let displayPath = '';
    let displayPathClass = ''

    $: { path,
        displayPath = path.length ? path : 'Dropbox/.../PRODUCCION/Script/SEASON_03'
        displayPathClass = path.length ? '' : 'font-extralight opacity-50'
    }

    const handleChooseDir = async () => {
        try {
            path = await os.showFolderDialog('Elegir la carpeta de base')
            if (path) {
                localStorage.setItem('prevPath', path)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    let formIsValid = true;
    $: formIsValid = !!(seasonValid && episodeValid && titleValid && path.length)

    $: { season,
        console.log(season)
        if (season) {
            localStorage.setItem('prevSeason', season)
        }
    }

    const handleScriptScaffoldAttempt = async () => {
        const success = await createScriptDirs(path, season, episode, title);
        if (success) {
            toastStore.trigger({ 
                message: `Carpetas de Script para S${season.padStart(2, '0')}E${episode.padStart(2, '0')} fue creadon con éxito!`,
                autohide: true,
                timeout: 4000
            })
            return
        }
        toastStore.trigger({ 
            message: `Había un error creando las carpetas de Script para S${season.padStart(2, '0')}E${episode.padStart(2, '0')}!`,
            background: 'variant-filled-error',
            autohide: false,
        })
        
    }

</script>

<form on:submit|preventDefault={ handleScriptScaffoldAttempt } class={`max-w-2xl flex flex-col space-y-2`} autocomplete="off">
    <div class="flex flex-row space-x-1">
        <TextInput 
            type="number"
            label='Temporada'
            required
            validator={ nameValidator }
            errorMessage={'Introduce el número de la temporada'}
            bind:value={ season }
            bind:valid={ seasonValid }
        />
        <TextInput 
            type="number"
            label='Episodio'
            required
            validator={ nameValidator }
            errorMessage={'Introduce el número del episodio'}
            bind:value={ episode }
            bind:valid={ episodeValid }
        />
        <TextInput 
            type="text"
            label='Título'
            required
            validator={ nameValidator }
            errorMessage={'Introduce el título del episodio'}
            bind:value={ title }
            bind:valid={ titleValid }
        />
    </div>

    <div class="pl-5 label !-mt-4">Carpeta de base</div>
    <div class="input-group input-group-divider grid-cols-[auto_1fr] py-2">
        <button type="button" class="variant-soft input-group-shim" on:click={ handleChooseDir }><IconFolder /></button>
        <div class={`${path.length ? '' : 'font-extralight opacity-25'} hover`} on:click={ handleChooseDir }>{displayPath}</div>
    </div>
    <div>
        <button class="btn w-full variant-filled-primary mt-4" disabled={ !formIsValid } ><IconFolderMultiple/> <span class="ms-2">Crear Carpetas</span></button>
    </div>
</form>

<style>
    .hover:hover {
        cursor: pointer;
    }
</style>