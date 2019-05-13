# svelte-simple-modal

[![Build Status](https://travis-ci.org/flekschas/svelte-simple-modal.svg?branch=master)](https://travis-ci.org/flekschas/svelte-simple-modal)
[![Demo](https://img.shields.io/badge/live-demo-ff69b4.svg)](https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.2.2)

A simple, small, and content-agnostic modal for [Svelte](https://svelte.dev).

![simple-modal](https://user-images.githubusercontent.com/932103/57642565-9d335d00-7585-11e9-80c6-e4b835f02428.gif)

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


<!-- App.svelte -->
<script>
  import { getContext } from 'svelte';
  import Surprise from './Surprise.svelte';
  import { key } from 'svelte-simple-modal';

  const { open } = getContext(key);

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


## Parameters

- **closeButton**: If `true` a button for closing the modal is rendered. (Default: `true`)
- **closeOnEsc**:  If `true` the modal will close when pressing the escape key. (Default: `true`)
- **closeOnOuterClick**:  If `true` the modal will close when clicking outside the modal window. (Default: `true`)
- **transitionBg**: Transition function for the background. (Default `svelte:fade`)
- **transitionBgProps**: Properties of the transition function for the background. (Default `{}`)
- **transitionWindow**: Transition function for the window. (Default `svelte:fade`)
- **transitionWindowProps**: Properties of the transition function for the window. (Default `{}`)
- **styleBg**: Style properties of the background. (Default `{}`)
- **styleWindow**: Style properties of the modal window. (Default `{}`)
- **styleContent**: Style properties of the modal content. (Default `{}`)


## License

[MIT](LICENSE)
