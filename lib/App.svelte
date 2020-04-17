<script>
	import { setContext, createEventDispatcher } from 'svelte';

	import { getClient } from './client';
	import { assignValueToTarget } from './targets';
	import PostcodeLookup from './PostcodeLookup/index.svelte';

	export let apiKey;

	export let apiOverrides = {};

	export let style = {};

	export let addressTargets = {
		addressLine1: '[data-address-line1]',
		locality: '[data-address-locality]',
		county: '[data-address-county]',
		postcode: '[data-address-postcode]',
	};

	const dispatch = createEventDispatcher();

	setContext('style', style);
	setContext('client', () => getClient(apiKey, apiOverrides));

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
	<PostcodeLookup on:address={handleAddress} />
</div>