<script>
  import { getContext } from 'svelte';

  export let value = '';

  export let classNames = {};

  export let onLookup = () => null;

  export let getClient = getContext('client');

  let response;

  let completions;

  const getAutocompletions = async () => {
    completions = null;
    
    if (!value || value.length < 2) {
      return false;
    }

    response = await getClient().getAutocomplete(value);

    if (!response.isCompleted) {
      completions = response.listCompletions();
      return;
    }

    const [[postcode]] = response;

    onLookup(postcode);
  };

  $: value, getAutocompletions();

  const handleClick = () => onLookup(value);
</script>

<div data-testid="container" class={classNames.container}>
  <label class={classNames.label} for="postcode-lookup-input">
    Postcode Lookup
  </label>
  <input id="postcode-lookup-input" list="autocomplete" bind:value={value} class={classNames.text} placeholder="Enter your postcode" type="text" />
  {#if completions && completions.length > 0}
  <datalist id="autocomplete">
    {#each completions as completion}
      <option>{completion}</option>
    {/each}
  </datalist>
  {/if}
  <button class={classNames.button} on:click|stopPropagation|preventDefault={handleClick} type="submit">
    Lookup
  </button>
</div> 