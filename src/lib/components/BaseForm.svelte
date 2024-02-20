<script lang="ts">
    import { z } from "zod";
    import TextInput from "./TextInput.svelte";
    import { os } from "@neutralinojs/lib";
    import IconFolder from '~icons/mdi/folder'
    import IconFolderMultiple from '~icons/mdi/folder-multiple'
    import type { PROJECT_TYPES } from '$lib/scaffolding/scaffold'

    import { normalizeTitle } from "$lib/scaffolding/scaffold";
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { knownEpisodes } from "$lib/scaffolding/known-episodes";
    import { debounce } from "$lib/util/debounce";

    export let scaffoldHandler: (rootPath: string, season: string, episode: string, title: string) => Promise<boolean>
    export let scaffoldType: typeof PROJECT_TYPES[number]
    
    const toastStore = getToastStore()

    const nameValidator = z.string().min(1);

    const prevSeason = localStorage.getItem('prevSeason')

    export let season = prevSeason ? prevSeason : ""
    let seasonValid = true;
    
    export let episode = ''
    let episodeValid = true;

    export let title = ''
    let titleValid = true;
    let titleDisabled = false;
    
    const prevPath = localStorage.getItem('prevPath')

    let path: string = prevPath ? prevPath : ''
    let displayPath = '';
    let displayPathClass = ''

    $: { path,
        displayPath = path.length ? path : `Dropbox/.../PRODUCCION/${scaffoldType}/Season-03`
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

    const setEpiName = (epiNum: string) => {
        const paddedEpiNum = parseInt(epiNum).toString().padStart(2, "0")
        if (knownEpisodes.hasOwnProperty(paddedEpiNum)) {
            titleDisabled = true;
            return knownEpisodes[paddedEpiNum]
        }
        titleDisabled = false;
    }

    let formIsValid = true;
    $: formIsValid = !!(seasonValid && episodeValid && titleValid && path.length)


    const handleEpisodeInput = () => {
        const epiTitle = setEpiName(episode);
        title = epiTitle ?? ''
    }

    const handleTitleInput = () => {
        title = normalizeTitle(title)
    }

    const handleScaffoldAttempt = async () => {
        const success = await scaffoldHandler(path, season, episode, title);
        if (success) {
            toastStore.trigger({ 
                message: `Las carpetas de ${scaffoldType}, para el capítulo "S${season.padStart(2, '0')}E${episode.padStart(2, '0')}-${normalizeTitle(title)}", fue creado con éxito!`,
                autohide: true,
                timeout: 4000
            })
            return
        }
        toastStore.trigger({ 
            message: `Había un error creando las carpetas de ${scaffoldType} para el capítulo "S${season.padStart(2, '0')}E${episode.padStart(2, '0')}-${normalizeTitle(title)}"!`,
            background: 'variant-filled-error',
            autohide: false,
        })
    }

</script>

<form on:submit|preventDefault={ handleScaffoldAttempt } class={`max-w-2xl flex flex-col space-y-2`} autocomplete="off">
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
            on:input={ debounce(handleEpisodeInput, 125) }

        />
        <TextInput 
            type="text"
            label='Título'
            required
            validator={ nameValidator }
            errorMessage={'Introduce el título del episodio'}
            disabled={ titleDisabled }
            bind:value={ title }
            bind:valid={ titleValid }
            on:input={ debounce(handleTitleInput, 250) }
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