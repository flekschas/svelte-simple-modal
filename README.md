# svelte-simple-modal

[![Build Status](https://travis-ci.org/flekschas/svelte-simple-modal.svg?branch=master)](https://travis-ci.org/flekschas/svelte-simple-modal)
[![Demo](https://img.shields.io/badge/live-demo-ff69b4.svg)](https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.15.0)

A simple, small, and content-agnostic modal for [Svelte](https://svelte.dev).

![simple-modal](https://user-images.githubusercontent.com/932103/57642565-9d335d00-7585-11e9-80c6-e4b835f02428.gif)

Tested with Svelte `v3.4` to `v3.15`.

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


## Parameters

- **key**: The context key that is used to expose `open()` and `close()`. Adjust to avoid clashes with other contexts. (Default: `simple-modal`)
- **setContext**: You can normally ingore this property when you have [configured your app  bundler](#configure-your-app-bundler) properly. If you want to bundle simple-modal with its own version of Svelte you have to pass `setContext()` from your main app to simple-modal using this parameter. (Default: `setContext()` of the associated `svelte` version.)
- **closeButton**: If `true` a button for closing the modal is rendered. (Default: `true`)
- **closeOnEsc**:  If `true` the modal will close when pressing the escape key. (Default: `true`)
- **closeOnOuterClick**:  If `true` the modal will close when clicking outside the modal window. (Default: `true`)
- **transitionBg**: Transition function for the background. (Default `svelte:fade`)
- **transitionBgProps**: Properties of the transition function for the background. (Default `{}`)
- **transitionWindow**: Transition function for the window. (Default `svelte:fade`)
- **transitionWindowProps**: Properties of the transition function for the window. (Default `{}`)
- **styleBg**: Style properties of the background. (Default `{top: 0, left: 0}`)
- **styleWindow**: Style properties of the modal window. (Default `{}`)
- **styleContent**: Style properties of the modal content. (Default `{}`)


## Context

You can access the context via `simple-modal` and it exports the following API:

- `open(Component, props, styling)`

   Opens the modal with `<Component {props}>` rendered as the content. `styling` can be used to temporarily adjust the styling of this specific modal, which can be useful for content-aware theming. `styling` needs to be an object of the following form:

   ```
   {
     bg: { backgroundImage: 'http://example.com/my-background.jpg' },
     window: { fontSize: 20em },
     content: { color: 'yellow' }
   }
   ```

- `close()`

   Closes the modal.


## License

[MIT](LICENSE)
