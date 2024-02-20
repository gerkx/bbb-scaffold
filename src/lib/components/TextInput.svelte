<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { HTMLInputTypeAttribute } from "svelte/elements";
    import type { ZodNumber, ZodString } from "zod";

    import IconEye from '~icons/mdi/eye'
    import IconEyeOff from '~icons/mdi/eye-off'
    
    export let errorMessage: string | undefined = undefined;
    export let label: string;
    export let required = false;
    export let type: HTMLInputTypeAttribute = 'text';
    export let validator: ZodString | ZodNumber;
    export let valid = true;
    export let value = '';
    export let placeholder: string | undefined = undefined
    export let disabled = false
    

    interface ComponentEvent {
        input: string
    }

    const dispatch = createEventDispatcher<ComponentEvent>();

    let _class = '';
    export { _class as class }

    let error: string | undefined
    let showPassword = false;
    let inputIsDirty = false;

    const toggleShowPassword = () => {
        showPassword = !showPassword;
    }

    const focusInit = (el: HTMLInputElement) => {
        if(el.value.length) {
            el.focus()
        }
    }

    const handleInput = (e: Event) => {
        value = (<HTMLInputElement>e.target).value;
        if (value.length && !inputIsDirty) {
            inputIsDirty = true;
        }
        dispatch("input", value)
    }

    const handleValidation = () => {
        const { success } = validator.safeParse(value);
        error = !success ? errorMessage : undefined
        valid = !success ? false : true;
    }
    
    

 
</script>

<div class={`${ _class }`}>
    <label for={ label } class="label">
        <span class={`pl-5 ${!valid ? 'text-error-500': ''}`}>
            { label }
            { #if required }
                <span class={`${!valid ? '': 'text-primary-500 '}`}>*</span>
            { /if }
        </span>
        { #if type === 'password'}
            <div class="input-group input-group-divider grid-cols-[1fr_auto]">
                { #if showPassword}
                    <input
                    type='text'
                    title={ label }
                    { placeholder } 
                    class={`${!valid ? 'input-error': ''}`}
                    { disabled }
                    bind:value={ value }
                    on:blur={ handleValidation }
                    use:focusInit
                    >
                    <button tabindex={ -1 } type="button" class="btn-icon bg-initial !px-2" on:click={toggleShowPassword}>
                        <IconEyeOff />
                    </button>
                { :else }
                    <input
                        type='password'
                        title={ label }
                        { placeholder } 
                        { disabled }
                        class={`${!valid ? 'input-error': ''}`}
                        bind:value={ value }
                        on:blur={ handleValidation }
                        use:focusInit
                    >
                    <button tabindex={ -1 } type="button" class="btn-icon bg-initial !px-2" on:click={toggleShowPassword}>
                        <IconEye />
                    </button>
                { /if }
            </div>
        { :else }
            <input
                { type }
                title={ label }
                { required }
                { disabled }
                class={`input ${!valid ? 'input-error': ''}`}
                autocomplete="off"
                { placeholder } 
                { value }
                on:blur={ handleValidation }
                on:input={ handleInput }
            >
        { /if }
    </label>
    <div class="text-xs h-4 mt-0 mb-4 text-error-500 pl-5">
        { #if error }
            {error}
        { /if }
    </div>
</div>