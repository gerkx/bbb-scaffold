<script lang="ts">
    import IconWindowMinimize from '~icons/mdi/window-minimize'
    import IconWindowMaximize from '~icons/mdi/window-maximize'
    import IconWindowRestore from '~icons/mdi/window-restore'
    import IconClose from '~icons/mdi/close'
    import { onMount } from 'svelte';
    import { app, window } from '@neutralinojs/lib';

    let isMaximized = false;

    const handleMinimize = async () => {
        await window.minimize()
    }

    const handleClose = async () => {
        await app.exit()
    }

    const handleMaximize = async () => {
        const isMax = await window.isMaximized();
        isMaximized = isMax
        if (isMax) {
            await window.unmaximize();
            isMaximized = false;
            return
        }
        await window.maximize();
        isMaximized = true;
    }

    onMount(() => {
        window.setDraggableRegion('titleBar')
    })
</script>

<div class="w-full flex flex-row justify-between items-center bg-surface-700" id="titleBar">
    <h4 class="h4 ml-2">Scaffold</h4>
    <div class="flex flex-row">
        <button class="btn btn-icon" on:click={ handleMinimize }><IconWindowMinimize /></button>
        { #if isMaximized} 
            <button class="btn btn-icon" on:click={ handleMaximize }><IconWindowRestore /></button>
        { :else }
            <button class="btn btn-icon" on:click={ handleMaximize } ><IconWindowMaximize /></button>
        { /if }
        <button class="btn btn-icon" on:click={ handleClose }><IconClose /></button>
    </div>

</div>