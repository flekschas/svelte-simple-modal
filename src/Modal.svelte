<script context="module">
  /**
   * @typedef {typeof import('svelte').SvelteComponent | typeof import('svelte').SvelteComponent<any>} Component
   * @typedef {import('svelte/types/runtime/transition').BlurParams} BlurParams
   * @typedef {import('svelte/types/runtime/transition').FadeParams} FadeParams
   * @typedef {import('svelte/types/runtime/transition').FlyParams} FlyParams
   * @typedef {import('svelte/types/runtime/transition').SlideParams} SlideParams
   * @typedef {import('svelte/types/runtime/transition').TransitionConfig} TransitionConfig
   * @typedef {Record<string, string | number>} Styles
   * @typedef {(node: Element, parameters: BlurParams | FadeParams | FlyParams | SlideParams) => TransitionConfig} TransitionFn
   * @typedef {{ id: string | null, ariaLabel: string | null, ariaLabelledBy: string | null, closeButton: Component | boolean, closeOnEsc: boolean, closeOnOuterClick: boolean, styleBg: Styles, styleWindowWrap: Styles, styleWindow: Styles, styleContent: Styles, styleCloseButton: Styles, classBg: string | null, classWindowWrap: string | null, classWindow: string | null, classContent: string | null, classCloseButton: string | null, transitionBg: TransitionFn, transitionBgProps: BlurParams, transitionWindow: TransitionFn, transitionWindowProps: BlurParams, disableFocusTrap: boolean, isTabbable: boolean, unstyled: boolean }} Options
   * @typedef {() => void} Callback
   * @typedef {{ onOpen: Callback; onOpened: Callback; onClose: Callback; onClosed: Callback }} Callbacks
   * @typedef {(NewComponent: Component, newProps?: Record<string, any>, options?: Partial<Options>, callbacks?: Partial<Callbacks>) => void} Open
   * @typedef {(callback?: Partial<Callbacks>) => void} Close
   * @typedef {{ open: Open, close: Close }} Context
   */

  /**
   * Create a Svelte component with props bound to it.
   * @type {(component: Component, props: Record<string, any>) => Component}
   */
  export function bind(Component, props = {}) {
    return function ModalComponent(options) {
      return new Component({
        ...options,
        props: {
          ...props,
          ...options.props,
        },
      });
    };
  }
</script>

<script>
  import * as svelte from 'svelte';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const baseSetContext = svelte.setContext;

  /**
   * A basic function that checks if a node is tabbale
   */
  const baseIsTabbable = (node) =>
    node.tabIndex >= 0 &&
    !node.hidden &&
    !node.disabled &&
    node.style.display !== 'none' &&
    node.type !== 'hidden' &&
    Boolean(
      node.offsetWidth || node.offsetHeight || node.getClientRects().length
    );

  /**
   * A function to determine if an HTML element is tabbable
   * @type {((node: Element) => boolean)}
   */
  export let isTabbable = baseIsTabbable;

  /**
   * Svelte component to be shown as the modal
   * @type {Component | null}
   */
  export let show = null;

  /**
   * Element ID assigned to the modal's root DOM element
   * @type {string | null}
   */
  export let id = null;

  /**
   * Svelte context key to reference the simple modal context
   * @type {string}
   */
  export let key = 'simple-modal';

  /**
   * Accessibility label of the modal
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-label
   * @type {string | null}
   */
  export let ariaLabel = null;

  /**
   * Element ID holding the accessibility label of the modal
   * @see https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
   * @type {string | null}
   */
  export let ariaLabelledBy = null;

  /**
   * Whether to show a close button or not
   * @type {Component | boolean}
   */
  export let closeButton = true;

  /**
   * Whether to close the modal on hitting the escape key or not
   * @type {boolean}
   */
  export let closeOnEsc = true;

  /**
   * Whether to close the modal upon an outside mouse click or not
   * @type {boolean}
   */
  export let closeOnOuterClick = true;

  /**
   * CSS for styling the background element
   * @type {Styles}
   */
  export let styleBg = {};

  /**
   * CSS for styling the window wrapper element
   * @type {Styles}
   */
  export let styleWindowWrap = {};

  /**
   * CSS for styling the window element
   * @type {Styles}
   */
  export let styleWindow = {};

  /**
   * CSS for styling the content element
   * @type {Styles}
   */
  export let styleContent = {};

  /**
   * CSS for styling the close element
   * @type {Styles}
   */
  export let styleCloseButton = {};

  /**
   * Class name for the background element
   * @type {string | null}
   */
  export let classBg = null;

  /**
   * Class name for window wrapper element
   * @type {string | null}
   */
  export let classWindowWrap = null;

  /**
   * Class name for window element
   * @type {string | null}
   */
  export let classWindow = null;

  /**
   * Class name for content element
   * @type {string | null}
   */
  export let classContent = null;

  /**
   * Class name for close element
   * @type {string | null}
   */
  export let classCloseButton = null;

  /**
   * Do not apply default styles to the modal
   * @type {boolean}
   */
  export let unstyled = false;

  /**
   * The setContext() function associated with this library
   * @description If you want to bundle simple-modal with its own version of
   * Svelte you have to pass `setContext()` from your main app to simple-modal
   * using this parameter
   * @see https://svelte.dev/docs#run-time-svelte-setcontext
   * @type {<T>(key: any, context: T) => T}
   */
  export let setContext = baseSetContext;

  /**
   * Transition function for the background element
   * @see https://svelte.dev/docs#transition_fn
   * @type {TransitionFn}
   */
  export let transitionBg = fade;

  /**
   * Parameters for the background element transition
   * @type {BlurParams | FadeParams | FlyParams | SlideParams}
   */
  export let transitionBgProps = { duration: 250 };

  /**
   * Transition function for the window element
   * @see https://svelte.dev/docs#transition_fn
   * @type {TransitionFn}
   */
  export let transitionWindow = transitionBg;

  /**
   * Parameters for the window element transition
   * @type {BlurParams | FadeParams | FlyParams | SlideParams}
   */
  export let transitionWindowProps = transitionBgProps;

  /**
   * If `true` elements outside the modal can be focused
   * @type {boolean}
   */
  export let disableFocusTrap = false;

  const defaultState = {
    id,
    ariaLabel,
    ariaLabelledBy,
    closeButton,
    closeOnEsc,
    closeOnOuterClick,
    styleBg,
    styleWindowWrap,
    styleWindow,
    styleContent,
    styleCloseButton,
    classBg,
    classWindowWrap,
    classWindow,
    classContent,
    classCloseButton,
    transitionBg,
    transitionBgProps,
    transitionWindow,
    transitionWindowProps,
    disableFocusTrap,
    isTabbable,
    unstyled,
  };
  let state = { ...defaultState };

  let Component = null;

  let background;
  let wrap;
  let modalWindow;
  let scrollY;
  let cssBg;
  let cssWindowWrap;
  let cssWindow;
  let cssContent;
  let cssCloseButton;
  let currentTransitionBg;
  let currentTransitionWindow;
  let prevBodyPosition;
  let prevBodyOverflow;
  let prevBodyWidth;
  let outerClickTarget;

  const camelCaseToDash = (str) =>
    str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();

  const toCssString = (props) =>
    props
      ? Object.keys(props).reduce(
          (str, key) => `${str}; ${camelCaseToDash(key)}: ${props[key]}`,
          ''
        )
      : '';

  const isFunction = (f) => !!(f && f.constructor && f.call && f.apply);

  const updateStyleTransition = () => {
    cssBg = toCssString(
      Object.assign(
        {},
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        state.styleBg
      )
    );
    cssWindowWrap = toCssString(state.styleWindowWrap);
    cssWindow = toCssString(state.styleWindow);
    cssContent = toCssString(state.styleContent);
    cssCloseButton = toCssString(state.styleCloseButton);
    currentTransitionBg = state.transitionBg;
    currentTransitionWindow = state.transitionWindow;
  };

  const toVoid = () => {};
  let onOpen = toVoid;
  let onClose = toVoid;
  let onOpened = toVoid;
  let onClosed = toVoid;

  /**
   * Open a modal.
   * @description Calling this method will close the modal. Additionally, it
   * allows to specify onClose and onClosed event handlers.`
   * @type {Open}
   */
  const open = (NewComponent, newProps = {}, options = {}, callbacks = {}) => {
    Component = bind(NewComponent, newProps);
    state = { ...defaultState, ...options };
    updateStyleTransition();
    disableScroll();
    onOpen = (event) => {
      if (callbacks.onOpen) callbacks.onOpen(event);
      /**
       * The open event is fired right before the modal opens
       * @event {void} open
       */
      dispatch('open');
      /**
       * The opening event is fired right before the modal opens
       * @event {void} opening
       * @deprecated Listen to the `open` event instead
       */
      dispatch('opening'); // Deprecated. Do not use!
    };
    onClose = (event) => {
      if (callbacks.onClose) callbacks.onClose(event);
      /**
       * The close event is fired right before the modal closes
       * @event {void} close
       */
      dispatch('close');
      /**
       * The closing event is fired right before the modal closes
       * @event {void} closing
       * @deprecated Listen to the `close` event instead
       */
      dispatch('closing'); // Deprecated. Do not use!
    };
    onOpened = (event) => {
      if (callbacks.onOpened) callbacks.onOpened(event);
      /**
       * The opened event is fired after the modal's opening transition
       * @event {void} opened
       */
      dispatch('opened');
    };
    onClosed = (event) => {
      if (callbacks.onClosed) callbacks.onClosed(event);
      /**
       * The closed event is fired after the modal's closing transition
       * @event {void} closed
       */
      dispatch('closed');
    };
  };

  /**
   * Close the modal.
   * @description Calling this method will close the modal. Additionally, it
   * allows to specify onClose and onClosed event handlers.`
   * @type {Close}
   */
  const close = (callbacks = {}) => {
    if (!Component) return;
    onClose = callbacks.onClose || onClose;
    onClosed = callbacks.onClosed || onClosed;
    Component = null;
    enableScroll();
  };

  const handleKeydown = (event) => {
    if (state.closeOnEsc && Component && event.key === 'Escape') {
      event.preventDefault();
      close();
    }

    if (Component && event.key === 'Tab' && !state.disableFocusTrap) {
      // trap focus
      const nodes = modalWindow.querySelectorAll('*');
      const tabbable = Array.from(nodes)
        .filter(state.isTabbable)
        .sort((a, b) => a.tabIndex - b.tabIndex);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && event.shiftKey) index = 0;

      index += tabbable.length + (event.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      event.preventDefault();
    }
  };

  const handleOuterMousedown = (event) => {
    if (
      state.closeOnOuterClick &&
      (event.target === background || event.target === wrap)
    )
      outerClickTarget = event.target;
  };

  const handleOuterMouseup = (event) => {
    if (state.closeOnOuterClick && event.target === outerClickTarget) {
      event.preventDefault();
      close();
    }
  };

  const disableScroll = () => {
    scrollY = window.scrollY;
    prevBodyPosition = document.body.style.position;
    prevBodyOverflow = document.body.style.overflow;
    prevBodyWidth = document.body.style.width;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
  };

  const enableScroll = () => {
    document.body.style.position = prevBodyPosition || '';
    document.body.style.top = '';
    document.body.style.overflow = prevBodyOverflow || '';
    document.body.style.width = prevBodyWidth || '';
    window.scrollTo({
      top: scrollY,
      left: 0,
      behavior: 'instant',
    });
  };

  /**
   * The exposed context methods: open() and close()
   * @type {Context}
   */
  const context = { open, close };

  setContext(key, context);

  let isMounted = false;

  $: {
    if (isMounted) {
      if (isFunction(show)) {
        open(show);
      } else {
        close();
      }
    }
  }

  svelte.onDestroy(() => {
    if (isMounted) close();
  });

  svelte.onMount(() => {
    isMounted = true;
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if Component}
  <div
    aria-hidden="true"
    id={state.id}
    class={state.classBg}
    class:bg={!unstyled}
    on:mousedown={handleOuterMousedown}
    on:mouseup={handleOuterMouseup}
    bind:this={background}
    transition:currentTransitionBg={state.transitionBgProps}
    style={cssBg}
  >
    <div
      class={state.classWindowWrap}
      class:wrap={!unstyled}
      bind:this={wrap}
      style={cssWindowWrap}
    >
      <div
        class={state.classWindow}
        class:window={!unstyled}
        role="dialog"
        aria-modal="true"
        aria-label={state.ariaLabelledBy ? null : state.ariaLabel || null}
        aria-labelledby={state.ariaLabelledBy || null}
        bind:this={modalWindow}
        transition:currentTransitionWindow={state.transitionWindowProps}
        on:introstart={onOpen}
        on:outrostart={onClose}
        on:introend={onOpened}
        on:outroend={onClosed}
        style={cssWindow}
      >
        {#if state.closeButton}
          {#if isFunction(state.closeButton)}
            <svelte:component this={state.closeButton} onClose={close} />
          {:else}
            <button
              class={state.classCloseButton}
              class:close={!unstyled}
              aria-label="Close modal"
              on:click={close}
              style={cssCloseButton}
              type="button"
            />
          {/if}
        {/if}
        <div
          class={state.classContent}
          class:content={!unstyled}
          style={cssContent}
        >
          <svelte:component this={Component} />
        </div>
      </div>
    </div>
  </div>
{/if}
<slot />

<style>
  * {
    box-sizing: border-box;
  }

  .bg {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.66);
  }

  @supports (-webkit-touch-callout: none) {
    body {
      /* The hack for Safari iOS */
      height: -webkit-fill-available;
    }
  }

  .wrap {
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

  .close:before,
  .close:after {
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

  .close:hover:before,
  .close:hover:after {
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

  .close:hover,
  .close:focus,
  .close:active {
    outline: none;
  }
</style>
