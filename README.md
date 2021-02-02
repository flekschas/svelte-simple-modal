<h1 align="center">
  svelte-simple-modal
</h1>

<div align="center">
  
  **A simple, small, and content-agnostic modal for [Svelte](https://svelte.dev).**
  
</div>

<br/>

<div align="center">
  
  [![NPM Version](https://img.shields.io/npm/v/svelte-simple-modal.svg?style=flat-square&color=7f99ff)](https://npmjs.org/package/svelte-simple-modal)
  [![Build Status](https://img.shields.io/github/workflow/status/flekschas/svelte-simple-modal/build?color=a17fff&style=flat-square)](https://github.com/flekschas/svelte-simple-modal/actions?query=workflow%3Abuild)
  [![File Size](http://img.badgesize.io/https://unpkg.com/svelte-simple-modal/src/Modal.svelte?compression=gzip&style=flat-square&color=e17fff)](https://bundlephobia.com/result?p=svelte-simple-modal)
  [![Code Style Prettier](https://img.shields.io/badge/code%20style-prettier-ff7fe1.svg?style=flat-square)](https://github.com/prettier/prettier#readme)
  [![Demo](https://img.shields.io/badge/demo-👍-ff7fa5.svg?style=flat-square)](https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.18.2)
  
</div>

<div id="teaser-matrices" align="center">
  
  ![simple-modal](https://user-images.githubusercontent.com/932103/57642565-9d335d00-7585-11e9-80c6-e4b835f02428.gif)
  
</div>

**Live demo:** https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.20.1

**Works with:** Svelte `>=v3.4` (Tested until to `v3.20`)

## Install

```bash
npm install --save svelte-simple-modal
```

## Usage

Import the `Modal` component into your main Svelte component (e.g., `App.svelte`).
The `Modal` is exposing two context functions `open()` and `close()` for opening
and closing the modal. `open()` expects two arguments: a Svelte `Component` and optionally an object literal with the component's `props`.

```html
<!-- App.svelte -->
<script>
  import Content from './Content.svelte';
  import Modal from 'svelte-simple-modal';
</script>

<Modal>
  <Content />
</Modal>


<!-- Content.svelte -->
<script>
  import { getContext } from 'svelte';
  import Surprise from './Surprise.svelte';

  const { open } = getContext('simple-modal');

  const showSurprise = () => {
    open(Surprise, { message: "It's a modal!" });
  };
</script>

<p><button on:click={showSurprise}>Show me a surprise!</button></p>


<!-- Surprise.svelte -->
<script>
  export let message;
</script>

<p>
  🎉 {message} 🍾
</p>
```

#### Configure your app bundler

**IMPORTANT:** In your main application's bundler you need to make sure that the
`svelte` dependencies are resolved globally, meaning that the main application's
version of `svelte` is used for bundling.

If you're using Rollup you can achieve this by setting the `dedupe` option of `rollup-plugin-node-resolve` as follows:

```js
import resolve from 'rollup-plugin-node-resolve';

export default {
  plugins: [
    resolve({
      // Below is the important line!
      dedupe: ['svelte', 'svelte/transition', 'svelte/internal']
    }),
  ]
};
```

**FOR SAPPER USERS:** If you're using [Sapper](https://sapper.svelte.dev/) make sure you install _svelte-simple-modal_ as a dev-dependency! If you're curious why please take a look at https://github.com/sveltejs/sapper-template#using-external-components

```
npm install -D svelte-simple-modal
```


## Parameters

The `<Modal />` component accepts the following parameters:

- **key**: The context key that is used to expose `open()` and `close()`. Adjust to avoid clashes with other contexts. (Default: `simple-modal`)
- **setContext**: You can normally ingore this property when you have [configured your app  bundler](#configure-your-app-bundler) properly. If you want to bundle simple-modal with its own version of Svelte you have to pass `setContext()` from your main app to simple-modal using this parameter. (Default: `setContext()` of the associated `svelte` version.)
- **closeButton**: If `true` a button for closing the modal is rendered. Note, you can also pass in a [custom Svelte component as the close button](#custom-close-button) to have full control over the styling. (Default: `true`)
- **closeOnEsc**:  If `true` the modal will close when pressing the escape key. (Default: `true`)
- **closeOnOuterClick**:  If `true` the modal will close when clicking outside the modal window. (Default: `true`)
- **transitionBg**: Transition function for the background. (Default `svelte:fade`)
- **transitionBgProps**: Properties of the transition function for the background. (Default `{}`)
- **transitionWindow**: Transition function for the window. (Default `svelte:fade`)
- **transitionWindowProps**: Properties of the transition function for the window. (Default `{}`)
- **styleBg**: Style properties of the background. (Default `{top: 0, left: 0}`)
- **styleWindowWrap**: Style properties of the modal window wrapper element. (Default `{}`)
- **styleWindow**: Style properties of the modal window. (Default `{}`)
- **styleContent**: Style properties of the modal content. (Default `{}`)
- **styleCloseButton**: Style properties of the built-in close button. (Default `{}`)


## Events

The `<Modal />` component dispatches the following events:

- `open`: dispatched when the modal window starts to open.
- `opened`: dispatched when the modal window opened.
- `close`: dispatched when the modal window starts to close.
- `closed`: dispatched when the modal window closed.

Alternatively, you can listen to those events via callbacks passed to [`open()`](#open) and [`close()`](#close).


## Context API

You can access the context via `getContext('simple-modal')`. It exposes the following two methods:

<a name="open" href="#open">#</a> <b>open</b>(<i>Component</i>, <i>props = {}</i>, <i>options = {}</i>, <i>callbacks = {}</i>)

  Opens the modal with `<Component {props}>` rendered as the content. `options` can be used to adjust the modal behavior once for the modal that is about to be opened. The `options` allows to customize all [parameters](#parameters) except `key` and `setContext`:

  ```javascript
  {
    closeButton: false,
    closeOnEsc: false,
    closeOnOuterClick: false,
    transitionBg: fade,
    transitionBgProps: {
      duration: 5000
    },
    transitionWindow: fly,
    transitionWindowProps: {
      y: 100,
      duration: 250
    },
    styleBg: { backgroundImage: 'http://example.com/my-background.jpg' },
    styleWindow: { fontSize: '20em' },
    styleContent: { color: 'yellow' },
    styleCloseButton: { width: '3rem', height: '3rem' }
  }
  ```

  Callbacks are triggered at the beginning and end of the opening and closing transition. The following callbacks are supported:

  ```javascript
  {
    onOpen: () => { /* modal window starts to open */ },
    onOpened: () => { /* modal window opened */ },
    onClose: () => { /* modal window starts to close */ },
    onClosed: () => { /* modal window closed */ },
  }
  ```

#### Custom Close Button

**This feature requires Svelte >=v3.19!**

Unfortunately, it's not possible to adjust all styles of the built-in close button via the `styleCloseButton` option. If you need full control you can implement your own Svelte component and use that as the close button. To do so specify your component via the `closeButton` option as follows:

```html
<!-- CloseButton.svelte -->
<script>
  // This property is used by Modal.svelte to pass down the close function
  export let onClose;
</script>

<style>
  /* Customize to your liking */
  button {
    position: absolute;
    top: -3rem;
    right: 0;
  }
</style>

<button on:click={onClose}>Custom Close Button</button>

<!-- Content.svelte -->
<script>
  import { getContext } from 'svelte';
  import Surprise from './Surprise.svelte';
  import CloseButton from './CloseButton.svelte';

  const { open } = getContext('simple-modal');

  const showSurprise = () => {
    open(Surprise, { message: "It's a modal!" }, { closeButton: CloseButton });
  };
</script>

<p><button on:click={showSurprise}>Show me a surprise!</button></p>
```

<a name="close" href="#close">#</a> <b>close</b>(<i>callbacks = {}</i>)

  Closes the modal. Similar to `open()`, this method supports adding callbacks for the closing transition:

  ```javascript
  {
    onClose: () => { /* modal window starts to close */ },
    onClosed: () => { /* modal window closed */ },
  }
  ```

## License

[MIT](LICENSE)
