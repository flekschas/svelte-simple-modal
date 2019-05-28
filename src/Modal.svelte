<script>
  import { setContext as baseSetContext } from 'svelte';
  import { fade } from 'svelte/transition';

  export let key = 'simple-modal';
  export let closeButton = true;
  export let closeOnEsc = true;
  export let closeOnOuterClick = true;
  export let transitionBg = fade;
  export let transitionBgProps = { duration: 250 };
  export let transitionWindow = transitionBg;
  export let transitionWindowProps = transitionBgProps;
  export let styleBg = {};
  export let styleWindow = {};
  export let styleContent = {};
  export let setContext = baseSetContext;

  let Component = null;
  let props = null;

  let background;
  let wrap;
  let customStyleBg = {};
  let customStyleWindow = {};
  let customStyleContent = {};

  const camelCaseToDash = str => str
    .replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

  const toCssString = (props) => Object.keys(props)
    .reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '');

  $: cssBg = toCssString(Object.assign({}, styleBg, customStyleBg));
  $: cssWindow = toCssString(Object.assign({}, styleWindow, customStyleWindow));
  $: cssContent = toCssString(Object.assign({}, styleContent, customStyleContent));

  const open = (NewComponent, newProps = {}, style = {bg: {}, window: {}, content: {}}) => {
    Component = NewComponent;
    props = newProps;
    customStyleBg = style.bg || {};
    customStyleWindow = style.window || {};
    customStyleContent = style.content || {};
  };

  const close = () => {
    Component = null;
    props = null;
    customStyleBg = {};
    customStyleWindow = {};
    customStyleContent = {};
  };

  const handleKeyup = ({ key }) => {
    if (closeOnEsc && Component && key === 'Escape') {
      event.preventDefault();
      close();
    }
  };

  const handleOuterClick = (event) => {
    if (
      closeOnOuterClick && (
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

<svelte:window on:keyup={handleKeyup}/>

<div>
  {#if Component}
    <div
      class="bg"
      on:click={handleOuterClick}
      bind:this={background}
      transition:transitionBg={transitionBgProps}
      style={cssBg}
    >
      <div class="window-wrap" bind:this={wrap}>
        <div
          class="window"
          transition:transitionWindow={transitionWindowProps}
          style={cssWindow}
        >
          {#if closeButton}
            <button on:click={close} class="close"></button>
          {/if}
          <div class="content" style={cssContent}>
            <Component {...props}/>
          </div>
        </div>
      </div>
    </div>
  {/if}
  <slot></slot>
</div>
