export default bind;
/**
 * Create a Svelte component with props bound to it.
 * @type {(component: Component, props: Record<string, any>) => Component}
 */
declare function bind(Component: any, props?: Record<string, any>): any;
