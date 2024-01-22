<script>
import "../app.pcss";
import { onMount } from "svelte";
import { init, app, filesystem, extensions, events, window  } from "@neutralinojs/lib";
import { AppBar, AppShell, Modal, Toast, initializeStores, } from '@skeletonlabs/skeleton'
import "@neutralinojs/lib/dist/neutralino.d.ts"
    import TitleBar from "$lib/components/TitleBar.svelte";

initializeStores();

const makeResizable = async () => {
    const { width, height} = await window.getSize()
    if (width && height) {

        await window.setSize({ width: width + 8, height})
    }
}

onMount(() => {
    init()
    makeResizable()
    
})
</script>


<Toast />
<div class="flex flex-col h-full">
    <TitleBar></TitleBar>
    <AppShell class="h-full">
        <div class="flex justify-center pt-4 h-full overflow-hidden">
            <slot></slot>
        </div>
    </AppShell>
</div>

<style>
    :global(html) {
        height: 100%;
        overflow-y:  hidden;
    }
    :global(body) {
        overflow-y:  hidden;
        height: 100%;
    }
</style>