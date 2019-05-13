<script>
  import { setContext } from 'svelte';
  import { fade } from 'svelte/transition';
  import key from './key.js';

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

  let Component = null;
  let props = null;

  let background;

  const camelCaseToDash = str => str
    .replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

  const toCssString = (props) => Object.keys(props)
    .reduce((str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`, '');

  $: cssBg = toCssString(styleBg);
  $: cssWindow = toCssString(styleWindow);
  $: cssContent = toCssString(styleContent);

  const open = (NewComponent, newProps = {}) => {
    Component = NewComponent;
    props = newProps;
  };

  const close = () => {
    Component = null;
    props = null;
  };

  const handleKeyup = ({ key }) => {
    if (closeOnEsc && Component && key === 'Escape') {
      event.preventDefault();
      close();
    }
  };

  const handleOuterClick = (event) => {
    if (closeOnOuterClick && event.target === background) {
      event.preventDefault();
      close();
    }
  };

  setContext(key, { open, close });
</script>

<style>
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

  .wrap {
    position: relative;
    margin: 1rem;
    max-height: 100%;
    overflow: auto;
  }

  .window {
    width: 40rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    color: black;
    border-radius: 0.5rem;
    background: white;
  }

  .content {
    padding: 1rem;
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
      <div class="wrap">
        <div
          class="window"
          transition:transitionWindow={transitionWindowProps}
          style={cssWindow}
        >
          <div class="content" style={cssContent}>
            {#if Component}
              <Component {...props}/>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
  <slot></slot>
</div>
