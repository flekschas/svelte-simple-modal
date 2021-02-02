<script>
  import * as svelte from 'svelte';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const baseSetContext = svelte.setContext;
  const SvelteComponent = svelte.SvelteComponent;

  export let key = 'simple-modal';
  export let closeButton = true;
  export let closeOnEsc = true;
  export let closeOnOuterClick = true;
  export let styleBg = { top: 0, left: 0 };
  export let styleWindowWrap = {};
  export let styleWindow = {};
  export let styleContent = {};
  export let styleCloseButton = {};
  export let setContext = baseSetContext;
  export let transitionBg = fade;
  export let transitionBgProps = { duration: 250 };
  export let transitionWindow = transitionBg;
  export let transitionWindowProps = transitionBgProps;

  const defaultState = {
    closeButton,
    closeOnEsc,
    closeOnOuterClick,
    styleBg,
    styleWindowWrap,
    styleWindow,
    styleContent,
    styleCloseButton,
    transitionBg,
    transitionBgProps,
    transitionWindow,
    transitionWindowProps,
  };
  let state = { ...defaultState };

  let Component = null;
  let props = null;

  let background;
  let wrap;
  let modalWindow;

  const camelCaseToDash = str => str
    .replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

  const toCssString = (props) => Object.keys(props)
    .reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '');

  // eslint-disable-next-line no-prototype-builtins
  const isSvelteComponent = component => SvelteComponent && SvelteComponent.isPrototypeOf && SvelteComponent.isPrototypeOf(component);

  $: cssBg = toCssString(state.styleBg);
  $: cssWindowWrap = toCssString(state.styleWindowWrap);
  $: cssWindow = toCssString(state.styleWindow);
  $: cssContent = toCssString(state.styleContent);
  $: cssCloseButton = toCssString(state.styleCloseButton);
  $: currentTransitionBg = state.transitionBg;
  $: currentTransitionWindow = state.transitionWindow;

  const toVoid = () => {};
  let onOpen = toVoid;
  let onClose = toVoid;
  let onOpened = toVoid;
  let onClosed = toVoid;

  const open = (
    NewComponent,
    newProps = {},
    options = {},
    callback = {}
  ) => {
    Component = NewComponent;
    props = newProps;
    state = { ...defaultState, ...options };
    onOpen = (event) => {
      if (callback.onOpen) callback.onOpen(event);
      dispatch('opening');
    },
    onClose = (event) => {
      if (callback.onClose) callback.onClose(event);
      dispatch('closing');
    },
    onOpened = (event) => {
      if (callback.onOpened) callback.onOpened(event);
      dispatch('opened');
    };
    onClosed = (event) => {
      if (callback.onClosed) callback.onClosed(event);
      dispatch('closed');
    };
  };

  const close = (callback = {}) => {
    onClose = callback.onClose || onClose;
    onClosed = callback.onClosed || onClosed;
    Component = null;
    props = null;
  };

  const handleKeydown = (event) => {
    if (state.closeOnEsc && Component && event.key === 'Escape') {
      event.preventDefault();
      close();
    }

    if (Component && event.key === 'Tab') {
      // trap focus
      const nodes = modalWindow.querySelectorAll('*');
      const tabbable = Array.from(nodes).filter(node => node.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && event.shiftKey) index = 0;

      index += tabbable.length + (event.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      event.preventDefault();
    }
  };

  const handleOuterClick = (event) => {
    if (
      state.closeOnOuterClick && (
        event.target === background || event.target === wrap
      )
    ) {
      event.preventDefault();
      close();
    }
  };

  setContext(key, { open, close });
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .bg {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.66);
  }

  .window-wrap {
    position: relative;
    margin: 2rem;
    max-height: 100%;
  }

  .window {
    position: relative;
    width: 40rem;
    max-width: 100%;
    max-height: 100%;
    margin: 2rem auto;
    color: black;
    border-radius: 0.5rem;
    background: white;
  }

  .content {
    position: relative;
    padding: 1rem;
    max-height: calc(100vh - 4rem);
    overflow: auto;
  }

  .close {
    display: block;
    box-sizing: border-box;
    position: absolute;
    z-index: 1000;
    top: 1rem;
    right: 1rem;
    margin: 0;
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
    border: 0;
    color: black;
    border-radius: 1.5rem;
    background: white;
    box-shadow: 0 0 0 1px black;
    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-appearance: none;
  }

  .close:before, .close:after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    width: 1rem;
    height: 1px;
    background: black;
    transform-origin: center;
    transition: height 0.2s cubic-bezier(0.25, 0.1, 0.25, 1),
                background 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  .close:before {
    -webkit-transform: translate(0, -50%) rotate(45deg);
    -moz-transform: translate(0, -50%) rotate(45deg);
    transform: translate(0, -50%) rotate(45deg);
    left: 0.25rem;
  }

  .close:after {
    -webkit-transform: translate(0, -50%) rotate(-45deg);
    -moz-transform: translate(0, -50%) rotate(-45deg);
    transform: translate(0, -50%) rotate(-45deg);
    left: 0.25rem;
  }

  .close:hover {
    background: black;
  }

  .close:hover:before, .close:hover:after {
    height: 2px;
    background: white;
  }

  .close:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 2px #3399ff;
  }

  .close:active {
    transform: scale(0.9);
  }

  .close:hover, .close:focus, .close:active {
    outline: none;
  }
</style>

<svelte:window on:keydown={handleKeydown}/>

{#if Component}
  <div
    class="bg"
    on:click={handleOuterClick}
    bind:this={background}
    transition:currentTransitionBg={state.transitionBgProps}
    style={cssBg}
  >
    <div class="window-wrap" bind:this={wrap} style={cssWindowWrap}>
      <div
        class="window"
        role="dialog"
        aria-modal="true"
        bind:this={modalWindow}
        transition:currentTransitionWindow={state.transitionWindowProps}
        on:introstart={onOpen}
        on:outrostart={onClose}
        on:introend={onOpened}
        on:outroend={onClosed}
        style={cssWindow}
      >
        {#if state.closeButton}
          {#if isSvelteComponent(state.closeButton)}
            <svelte:component this={state.closeButton} onClose={close} />
          {:else}
            <button on:click={close} class="close" style={cssCloseButton} />
          {/if}
        {/if}
        <div class="content" style={cssContent}>
          <svelte:component this={Component} {...props} />
        </div>
      </div>
    </div>
  </div>
{/if}
<slot></slot>
