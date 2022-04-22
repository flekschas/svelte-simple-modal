/**
 * Create a Svelte component with props bound to it.
 * @type {(component: Component, props: Record<string, any>) => Component}
 */
function bind(Component, props = {}) {
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

export default bind;
