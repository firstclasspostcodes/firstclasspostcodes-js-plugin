<script>
	import { setContext, createEventDispatcher } from 'svelte';

	import { getClient } from './client';
	import { assignValueToTarget } from './targets';
	import PostcodeLookup from './PostcodeLookup';

	export let apiKey;

	export let apiOverrides = {};

	export let style = {};

	export let addressTargets = {};

	const dispatch = createEventDispatcher();

	setContext('style', style);

	const { classNames: { root = {} } = {} } = style;

	const handleAddress = ({ detail }) => {
		dispatch('address', detail);
		assignValueToTarget(addressTargets.addressLine1, detail.address);
		assignValueToTarget(addressTargets.locality, detail.locality);
		assignValueToTarget(addressTargets.county, detail.region);
		assignValueToTarget(addressTargets.postcode, detail.postcode);
	};
</script>

<div class={root.container}>
	<PostcodeLookup on:address={handleAddress} getClient={() => getClient(apiKey, apiOverrides)} />
</div>