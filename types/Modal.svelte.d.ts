/// <reference types="svelte" />
import { SvelteComponentTyped } from 'svelte';

export interface ModalProps {
  /**
   * Svelte component to be shown as the modal
   * @default null
   */
  show?: Component | null;

  /**
   * Svelte context key to reference the simple modal context
   * @default 'simple-modal'
   */
  key?: string;

  /**
   * Accessibility label of the modal
   * @default null
   */
  ariaLabel?: string | null;

  /**
   * Element ID holding the accessibility label of the modal
   * @default null
   */
  ariaLabelledBy?: string | null;

  /**
   * Whether to show a close button or not
   * @default true
   */
  closeButton?: Component | boolean;

  /**
   * Whether to close the modal on hitting the escape key or not
   * @default true
   */
  closeOnEsc?: boolean;

  /**
   * Whether to close the modal upon an outside mouse click or not
   * @default true
   */
  closeOnOuterClick?: boolean;

  /**
   * CSS for styling the background element
   * @default {}
   */
  styleBg?: Record<string, string | number>;

  /**
   * CSS for styling the window wrapper element
   * @default {}
   */
  styleWindowWrap?: Record<string, string | number>;

  /**
   * CSS for styling the window element
   * @default {}
   */
  styleWindow?: Record<string, string | number>;

  /**
   * CSS for styling the content element
   * @default {}
   */
  styleContent?: Record<string, string | number>;

  /**
   * CSS for styling the close element
   * @default {}
   */
  styleCloseButton?: Record<string, string | number>;

  setContext?: (key: any, context: any) => void;

  /**
   * Transition function for the background element
   */
  transitionBg?: (node: Element, parameters: BlurParams) => TransitionConfig;

  /**
   * Parameters for the background element transition
   * @default { duration: 250 }
   */
  transitionBgProps?: BlurParams;

  /**
   * Transition function for the window element
   */
  transitionWindow?: (
    node: Element,
    parameters: BlurParams
  ) => TransitionConfig;

  /**
   * Parameters for the window element transition
   */
  transitionWindowProps?: BlurParams;

  /**
   * If `true` elements outside the modal can be focused
   * @default false
   */
  disableFocusTrap?: boolean;
}

export default class Modal extends SvelteComponentTyped<
  ModalProps,
  {
    open: CustomEvent<void>;
    opening: CustomEvent<void>;
    close: CustomEvent<void>;
    closing: CustomEvent<void>;
    opened: CustomEvent<void>;
    closed: CustomEvent<void>;
  },
  { default: {} }
> {
  /**
   * Create a Svelte component with props bound to it.
   */
  bind: (component: Component, props: Record<string, any>) => Component;
}
