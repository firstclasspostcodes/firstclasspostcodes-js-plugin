<script>
  export let addresses;

  export let classNames = {};

  export let onSelected = () => null;

  const onChange = (e) => onSelected(e.target.value);
</script>

<div data-testid="container" class={classNames.container}>
  <label class={classNames.label} for="select-address">Select your address</label>
  <select class={classNames.select} on:change|stopPropagation|preventDefault={onChange} id="select-address">
    {#if addresses && addresses.length > 0}
      <option selected disabled>Choose address...</option>
      {#each addresses as [value, text]}
        <option value={value}>{text}</option>
      {/each}
    {:else}
      <option>No addresses found</option>
    {/if}
  </select>
</div>