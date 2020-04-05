<script>
  import { onDestroy, getContext, createEventDispatcher } from 'svelte';

  import { getTarget } from '../targets';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  
  export let getClient;

  const { selectTarget } = getContext('style');

  const dispatch = createEventDispatcher();

	let address = null;

	let response = null;

  let selectComponent;

  $: target = getTarget(selectTarget);

  const unmountSelectComponent = () => {
    if (selectComponent) {
      selectComponent.$destroy()
    }
  }

	const handleSelected = (e) => {
    address = response.formatAddress(e.target.value);
    dispatch('address', address);
	};

  const getAddresses = async (input) => {
		response = await getClient().getPostcode(input);
    
    if (target) {
      unmountSelectComponent();
      selectComponent = new Select({
        target,
        props: {
          onChange: handleSelected,
          addresses: response.listAddresses(),
        },
      });
    }
	};

  onDestroy(() => unmountSelectComponent());
</script>

<Input onSubmit={getAddresses} />

{#if !target && response}
  <Select onChange={handleSelected} addresses={response.listAddresses()} />
{/if}