<script>
  import { onDestroy, getContext, createEventDispatcher } from 'svelte';

  import { getTarget } from '../targets';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  
  const { selectTarget, classNames = {} } = getContext('style') || {};

  const getClient = getContext('client');

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

	const handleSelected = (value) => {
    address = response.formatAddress(value);
    dispatch('address', address);
	};

  const handleLookup = async (value) => {
		response = await getClient().getPostcode(value);
    
    if (target) {
      unmountSelectComponent();
      selectComponent = new Select({
        target,
        props: {
          onSelected: handleSelected,
          addresses: response.listAddresses(),
        },
      });
    }
	};

  onDestroy(() => unmountSelectComponent());
</script>

<Input classNames={classNames.input} onLookup={handleLookup} />

{#if !target && response}
  <Select classNames={classNames.select} onSelected={handleSelected} addresses={response.listAddresses()} />
{/if}