<script>
  export let value = '';

  export let classNames = {};

  export let onLookup = () => null;

  const handleClick = () => onLookup(value);
</script>

<div data-testid="container" class={classNames.container}>
  <label class={classNames.label} for="postcode-lookup">
    Postcode Lookup
  </label>
  <input id="postcode-lookup" bind:value={value} class={classNames.text} placeholder="Enter your postcode" type="text" />
  <button class={classNames.button} on:click|stopPropagation|preventDefault={handleClick} type="submit">
    Lookup
  </button>
</div> 