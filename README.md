[//]: # "Comment"

# Firstclasspostcodes
![Build, test and release](https://github.com/firstclasspostcodes/firstclasspostcodes-js-plugin/workflows/Build,%20test%20and%20release/badge.svg)

Our browser plugin is compatible with all modern browsers and IE9+ _(polyfills required)_.

This simple to use plugin helps you to get started quickly, allowing you to add postcode lookup to any address form in minutes. 

## Documentation
See [@firstclasspostcodes/plugin](https://docs.firstclasspostcodes.com/js/plugin) for detailed usage, guides and examples.

## Installation
Add the plugin directly into your HTML with:

```html
<script src="https://js.firstclasspostcodes.com/plugin/v1.0.3.js"></script>
```

**Note on older browsers:** You will need to use a polyfill service, the following example covers all of the required language features:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Promise%2Cfetch%2CObject.assign%2Cdefault"></script>
```

### Add the client library
We do not bundle the client library with the plugin, so you will need to add a separate script tag to require the JS client:

```html
<script src="https://js.firstclasspostcodes.com/v1.5.1.js"></script>
```

All JS library versions are available on the [@firstclasspostcodes/js](https://github.com/firstclasspostcodes/firstclasspostcodes-js/releases) releases page.

### Security
Where the libary is loaded on pages including sensitive information, we recommend using the [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) security feature. 

Every version of the library is accompanied by an SRI hash file, the hash can be accessed directly using:

```sh
$ curl https://js.firstclasspostcodes.com/plugin/v1.0.3.sri.txt # => "sha256-45tfd... sha384-43567ytr..."
```

You can then update the above `<script>` tag, adding the integrity attribute:

```html
<script src="https://js.firstclasspostcodes.com/plugin/v1.0.3.js"
        integrity="sha256-45tfd... sha384-43567ytr..."
        crossorigin="anonymous"></script>
```

## Usage
You need to configure the plugin to use your API Key which is available on your [dashboard](https://dashboard.firstclasspostcodes.com/key). Below is a minimal working setup, you can see more guides on how to better customise the plugin by [viewing the documentation](https://docs.firstclasspostcodes.com/js/plugin).

```html
<div id="postcode-lookup-form"></div>
<form>
  <div>
    <label for="address-line-1">Address Line 1</label>
    <input name="address-line-1" type="text" data-address-line1 />
  </div>
  <div>
    <label for="address-line-2">Address Line 2</label>
    <input name="address-line-2" type="text" data-address-line2 />
  </div>
  <div>
    <label for="county">County</label>
    <input name="county" type="text" data-address-locality />
  </div>
  <div>
    <label for="city">City</label>
    <input name="city" type="text" data-address-county />
  </div>
  <div>
    <label for="postcode">Postcode</label>
    <input name="postcode" type="text" data-address-postcode />
  </div>
</form>

<script>
  FirstclasspostcodesPlugin(
    document.getElementById('postcode-lookup-form'), 
    {
      apiKey: '111111111111',
    },
  );  
</script>
```

## Configuration
The plugin can be initialized with the same configuration overrides that you can supply for the [@firstclasspostcodes/js](https://github.com/firstclasspostcodes/firstclasspostcodes-js#configuration) library using the `apiOverrides` property (an example of its usage is below).

If you're running the [mock service](https://github.com/firstclasspostcodes/firstclasspostcodes-mock) docker container. You can configure the plugin to talk to it using the example below:

```html
<script>
  FirstclasspostcodesPlugin(
    document.getElementById('postcode-lookup-form'), 
    {
      apiKey: '111111111111', 
      apiOverrides: {
        endpoint: 'http://localhost:2345',
      }
    }
  );  
</script>
```

## Events
Whilst not necessarily required, if you need to listen to events happening we support attaching event handlers for the following:

| Event Name | Description |
|:-------|:--------|
| `address` | Fired when an address is selected from the drop down. Contains the address detail. |

Events are fired using the [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent) class. Event properties are included inside the `.detail` property.

Event handlers can be attached using the following:

```html
<script>
  var plugin = FirstclasspostcodesPlugin(...);
  
  plugin.$on('address', (event) => {
    console.log(event.detail);
  });
</script>
```

## Plugin
Our plugin is built using [Svelte](https://svelte.dev) and an instantiated component is returned from the `FirstclasspostcodesPlugin()` function. Therefore, the returned object is compatible with the documented [Client-side component API](https://svelte.dev/docs#Client-side_component_API).