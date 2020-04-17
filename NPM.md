# Firstclasspostcodes
![Build, test and release](https://github.com/firstclasspostcodes/firstclasspostcodes-js-plugin/workflows/Build,%20test%20and%20release/badge.svg) [![Cypress Dashboard](https://img.shields.io/badge/cypress-dashboard-brightgreen.svg)](https://dashboard.cypress.io/projects/hu4kvr/runs)

We've designed our [Svelte](https://svelte.dev) component library to be as flexible as possible enabling you to quickly configure build or enhance any form with postcode lookup.

> **Note:** This libary is also used to power our drop-in browser plugin. The documentation provided inside [README.md](/README.md) is for the plugin and the documentation displayed on GitHub.

## Documentation
See [@firstclasspostcodes/svelte](https://docs.firstclasspostcodes.com/js/svelte) for detailed usage, guides and examples.

## Installation
Install the package with:

```
npm install @firstclasspostcodes/svelte -s
```

Once installed, import the component inside a component file:

```html
<script>
	import PostcodeLookup from '@firstclasspostcodes/svelte';
</script>
<main>
  <PostcodeLookup apiKey="111111111111" />
  <form>
    <div>
			<label for="postcode">Postcode</label>
			<input name="postcode" type="text" data-address-postcode />
		</div>
  </form>
</main>
```

For more guides and information on how to configure and use the components, [read our documentation](https://docs.firstclasspostcodes.com/js/svelte).

## Development
Because Svelte is highly portable _(and awesome)_, the library is **primarily used to power our drop-in browser plugin**. The fact that the `<PostcodeLookup/>` component can be exported to provide a Svelte library, is a happy side-effect.

> Any development on this library must be portable, or avoid adversely affecting usage inside the browser plugin; enabling continued support of IE11 with Polyfills. 

The guiding principle for developing this library is KISS (**k**eep-**i**t-**s**imple-**s**tupid). If you're developing something that seems undocumented or off the paved road, you're probably doing something wrong. **It is always best to open an issue to discuss it first.**

### Getting started
Run the mock API container, this will provide some data you can develop & test with locally:

```
docker run --rm -d -p 2345:80 firstclasspostcodes/mock:latest
```

For development, we use `index.html`, which is served by the [parcel bundler](https://parceljs.org). The intention of this webpage, is to provide some visual feedback for the library and allows for experimental usage. Most importantly, it is the page used by Cypress for integration testing.

Start the development app:

```
npm start
```

Open your browser and point it at the URL displayed in the terminal. The browser plugin will not automatically start. Open the developer tools and run the following:

```js
window.initPlugin();
```

### Testing
All changes to modules should be accompanied with matching tests and functional changes should have accompanying integration tests, written using Cypress.

Run the tests:

```
npm test && npm run lint
```

### Cypress
Provide necessary Cypress variables to run the testing suite:

**Headless:**

```
CYPRESS_API_URL=http://localhost:2345 CYPRESS_API_KEY=111111111111 npm run cypress
```

**Interactively:**

```
CYPRESS_API_URL=http://localhost:2345 CYPRESS_API_KEY=111111111111 npx cypress open
```