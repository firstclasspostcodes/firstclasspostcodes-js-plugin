<script>
  import { getContext } from 'svelte';

  export let addresses = [];

  export let onChange = () => null;

  const { classNames: { select = {} } = {} } = getContext('style');
</script>

<div class={select.container}>
  <label class={select.label} for="select-address">Select your address</label>
  <select class={select.select} on:change={onChange} id="select-address">
    {#if addresses.length > 0}
      <option disabled>Choose address...</option>
      {#each addresses as [value, text]}
        <option value={value}>{text}</option>
      {/each}
    {:else}
      <option>No addresses found</option>
    {/if}
  </select>
</div>