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

## Table of Contents

- [Install](#install)
  - [Rollup Setup](#rollup-setup)
  - [Sapper Setup](#sapper-setup)
- [Usage](#usage)
  - [SSR](#server-side-rendering)
- [API](#api)
  - [Component](#component-api)
  - [Events](#component-events)
  - [Context API](#context-api)
  - [Store API](#store-api)
- [FAQ](#faq)

## Install

```bash
npm install --save svelte-simple-modal
```

#### Rollup Setup

Make sure that the main application's version of `svelte` is used for bundling by setting `rollup-plugin-node-resolve`'s `dedupe` option as follows:

```js
import resolve from 'rollup-plugin-node-resolve';

export default {
  plugins: [
    resolve({
      dedupe: ['svelte', 'svelte/transition', 'svelte/internal'], // important!
    }),
  ],
};
```

#### Sapper Setup

Make sure you install _svelte-simple-modal_ as a [dev-dependency](https://github.com/sveltejs/sapper-template#using-external-components).

```bash
npm install -D svelte-simple-modal
```

## Usage

Import the `Modal` component into your main Svelte component (e.g., `App.svelte`).

The `Modal` is exposing [two context functions](#context-api) for opening
and closing the modal. [`open()`](#open) opens a component as a modal and expects two arguments: a Svelte `Component` and optionally an object literal with the component's `props`. [`close()`](#close) simply closes the modal.

Alternatively, you can show a component as a modal by passing it to the `<Modal show={} />` as a [Svelte store](#store-api).

```svelte
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

#### Server-Side Rendering

With [SvelteKit](https://kit.svelte.dev/) you can enable [SSR](https://www.google.com/search?q=server+side+rendering) using the `browser` environmental variable as follows:

```svelte
<script>
  import Modal from 'svelte-simple-modal';
  import { browser } from '$app/env';
</script>

{#if browser}
  <Modal>
    <Content />
  </Modal>
{/if}
```

Alternatively, you can enable SSR by dynamically importing svelte-simple-modal in `onMount()` as follows:

```js
import { onMount } from 'svelte';

onMount(async () => {
  const svelteSimpleModal = await import('svelte-simple-modal');
  Modal = svelteSimpleModal.default;
});
```

#### Accessibility

The library applies the following WAI-ARIA guidelines for modal dialogs
automtically:

- `aria-modal="true"` and `role="dialog"` are applied automatically
- The tab focus is trapped in the modal
- The modal is closed on pressing the `esc` key

To further improve the accessibility you'll have to either provide a label via
[`ariaLabel`](https://www.w3.org/TR/wai-aria-1.1/#aria-label) or reference a
title element via [`ariaLabelledBy`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby).
The `ariaLabel` is automatically omitted when `ariaLabelledBy` is specified.

## API

### Component API

The `<Modal />` component accepts the following optional properties:

| Property                  | Type                             | Default             | Description                                                                                                                                                                                                                                                 |
| ------------------------- | -------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **show**                  | Component \| null                | `null`              | A Svelte component to show as the modal. See [Store API](#store-api) for details.                                                                                                                                                                           |
| **ariaLabel**             | string \| null                   | `null`              | Accessibility label of the modal. See [W3C WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#aria-label) for details.                                                                                                                                           |
| **ariaLabelledBy**        | string \| null                   | `null`              | Element ID holding the accessibility label of the modal. See [W3C WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby) for details.                                                                                                               |
| **closeButton**           | Component \| boolean             | `true`              | If `true` a button for closing the modal is rendered. You can also pass in a [custom Svelte component](#custom-close-button) to have full control over the styling.                                                                                         |
| **closeOnEsc**            | boolean                          | `true`              | If `true` the modal will close when pressing the escape key.                                                                                                                                                                                                |
| **closeOnOuterClick**     | boolean                          | `true`              | If `true` the modal will close when clicking outside the modal window.                                                                                                                                                                                      |
| **transitionBg**          | function                         | `svelte.fade`       | Transition function for the background.                                                                                                                                                                                                                     |
| **transitionBgProps**     | BlurParams                       | `{}`                | Properties of the transition function for the background.                                                                                                                                                                                                   |
| **transitionWindow**      | function                         | `svelte.fade`       | Transition function for the window.                                                                                                                                                                                                                         |
| **transitionWindowProps** | BlurParams                       | `{}`                | Properties of the transition function for the window.                                                                                                                                                                                                       |
| **styleBg**               | Record<string, string \| number> | `{}`                | Style properties of the background.                                                                                                                                                                                                                         |
| **styleWindowWrap**       | Record<string, string \| number> | `{}`                | Style properties of the modal window wrapper element.                                                                                                                                                                                                       |
| **styleWindow**           | Record<string, string \| number> | `{}`                | Style properties of the modal window.                                                                                                                                                                                                                       |
| **styleContent**          | Record<string, string \| number> | `{}`                | Style properties of the modal content.                                                                                                                                                                                                                      |
| **styleCloseButton**      | Record<string, string \| number> | `{}`                | Style properties of the built-in close button.                                                                                                                                                                                                              |
| **disableFocusTrap**      | boolean                          | `false`             | If `true` elements outside the modal can be in focus. This can be useful in certain edge cases.                                                                                                                                                             |
| **key**                   | string                           | `"simple-modal"`    | The context key that is used to expose `open()` and `close()`. Adjust to avoid clashes with other contexts.                                                                                                                                                 |
| **setContext**            | function                         | `svelte.setContent` | You can normally ingore this property when you have [configured Rollup properly](#rollup-setup). If you want to bundle simple-modal with its own version of Svelte you have to pass `setContext()` from your main app to simple-modal using this parameter. |

### Component Events

The `<Modal />` component dispatches the following events:

- `open`: dispatched when the modal window starts to open.
- `opened`: dispatched when the modal window opened.
- `close`: dispatched when the modal window starts to close.
- `closed`: dispatched when the modal window closed.

Alternatively, you can listen to those events via callbacks passed to [`open()`](#open) and [`close()`](#close).

### Context API

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
  styleCloseButton: { width: '3rem', height: '3rem' },
  disableFocusTrap: true
}
```

<a name="close" href="#close">#</a> <b>close</b>(<i>callbacks = {}</i>)

Closes the modal. Similar to `open()`, this method supports adding callbacks for the closing transition:

```javascript
{
  onClose: () => { /* modal window starts to close */ },
  onClosed: () => { /* modal window closed */ },
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

### Store API

You can also use [Svelte stores](https://svelte.dev/tutorial/writable-stores) to open a modal using the `<Modal />`'s [`show` property](#properties) as follows:

```svelte
<!-- App.svelte -->
<script>
  import { writable } from 'svelte/store';
  import Content from './Content.svelte';
  import Popup from './Popup.svelte';
  export const modal = writable(null);

  function showModal() {
    modal.set(Popup)
  }
</script>

<Content />
<button on:click={showModal}>Show modal</button>


<!-- Content.svelte -->
<script>
  import Modal from 'svelte-simple-modal';
  import SomethingElse from './SomethingElse.svelte';
  import { modal } from './App.svelte';
</script>

<Modal show={$modal}>
  <SomethingElse />
</Modal>
```

An added benefit of using stores is that the component opening the modal does not have to be a parent of `<Modal />`. For instance, in the example above, `App.svelte` is toggling `Popup.svelte` as a modal even though `App.svelte` is not a child of `<Modal />`.

#### Bind Props to a Component Shown as a Modal

Sometimes you want to pass properties to the component shown as a modal. To accomplish this, you can use our `bind()` helper function as follows:

```svelte
<script>
  import { bind } from 'svelte-simple-modal';
  import Popup from './Popup.svelte';
  import { modal } from './App.svelte';

  modal.set(bind(Popup, { name: 'custom name' }));
</script>
```

If you've worked with React/JSX then think of `const c = bind(Component, props)` as the equivalent of `const c = <Component ...props />`.

## FAQ

#### Custom Close Button

**This feature requires Svelte >=v3.19!**

Unfortunately, it's not possible to adjust all styles of the built-in close button via the `styleCloseButton` option. If you need full control you can implement your own Svelte component and use that as the close button. To do so pass your component via the `closeButton` option to `<Modal />` or `open()`.

For example, your close button might look as follows:

```svelte
<!-- CloseButton.svelte -->
<script>
  // This property is used by Modal.svelte to pass down the close function
  export let onClose;
</script>

<button on:click={onClose}>Custom Close Button</button>

<style>
  /* Customize to your liking */
  button {
    position: absolute;
    top: -3rem;
    right: 0;
  }
</style>
```

Now you can set it as the default close button by passing it to `<Modal />` as follows:

```svelte
<!-- App.svelte -->
<script>
  import Content from './Content.svelte';
  import CloseButton from './CloseButton.svelte';
  import Modal from 'svelte-simple-modal';
</script>

<Modal closeButton={CloseButton}>
  <Content />
</Modal>
```

Or you can pass `CloseButton` to `open()` as shown below:

```svelte
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

## License

[MIT](LICENSE)
