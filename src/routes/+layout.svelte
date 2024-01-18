<script>
import "../app.pcss";
import { onMount } from "svelte";
import { init, app, filesystem, extensions, events, window  } from "@neutralinojs/lib";
import { AppBar, AppShell, Modal, Toast, initializeStores, } from '@skeletonlabs/skeleton'
import "@neutralinojs/lib/dist/neutralino.d.ts"
</script>


<!-- <Toast /> -->
<AppShell>
    <div class="flex flex-col justify-center items center">
        <h2 class="h2">Scaffold</h2>

        <slot></slot>
    </div>
</AppShell>