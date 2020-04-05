<script>
  import { getContext } from 'svelte';

  export let onSubmit = () => null;

  export let value = '';

  const { classNames: { input = {} } = {} } = getContext('style');
</script>

<div class={input.container}>
  <label class={input.label} for="postcode-lookup">
    Postcode Lookup
  </label>
  <input id="postcode-lookup"  bind:value={value}  class={input.text} placeholder="Enter your postcode"  type="text" />
  <button class={input.button} on:click|stopPropagation|preventDefault={() => onSubmit(value)} type="submit">
    Lookup
  </button>
</div> 