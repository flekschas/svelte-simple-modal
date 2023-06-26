# 1.6.0

- Enable usage with Svelte v4 (the library remains compatible with v3)
- Update third-party libs

# 1.5.2

- Fix and expose context types. This is useful as an interim solution for ([#88(https://github.com/flekschas/svelte-simple-modal/pull/88)). E.g.:

  ```ts
  import { getContext } from 'svelte';
  import type { Context } from 'svelte-simple-modal';
  const { open, close } = getContext('simple-modal') as Context;
  ```

# 1.5.1

- Fix the scroll reset behavior to `instant` to avoid seeing a smooth scrolling when closing the modal in cases where the default scroll behavior was changed ([#97(https://github.com/flekschas/svelte-simple-modal/pull/97))

# 1.5.0

- Add property to assign an ID to the modal's root element ([#96(https://github.com/flekschas/svelte-simple-modal/pull/96))

# 1.4.6

- Improve type definition ([#94(https://github.com/flekschas/svelte-simple-modal/pull/94))

# 1.4.5

- Fix min-height issue with Safari iOS 15 ([#64](https://github.com/flekschas/svelte-simple-modal/issues/64))

# 1.4.4

- One more type definition improvement

# 1.4.3

- Further improve type definitions

# 1.4.2

- Improve type definitions

# 1.4.1

- Avoid submitting a `<form />` if it wraps `<Modal />` by setting the close button type to `button`. ([#84](https://github.com/flekschas/svelte-simple-modal/pull/84)) Shoutout to [@jnysteen](https://github.com/jnysteen)!

# 1.4.0

- Skip untabbable element ([#82](https://github.com/flekschas/svelte-simple-modal/issues/82)) Massive thanks to [@jassenjj](https://github.com/jassenjj) 🙏
- Added `isTabbable` property to allow users to override the tab-check. E.g., one might want to use a more the [tabbable library](https://github.com/focus-trap/tabbable#istabbable).

# 1.3.4

- Respect the tab order defined by `tabindex` attributes of elements within a modal ([#80](https://github.com/flekschas/svelte-simple-modal/pull/80))

# 1.3.3

- Fix accidentally removed global export of `bind()`

# 1.3.2

- Fix type issue of `bind()` via a new version of `sveld` (#73). See https://github.com/carbon-design-system/sveld/issues/83 for context. Also huge shoutout to [Dustin Coffey](https://github.com/dustinc) for [his PR (#75) on this matter](https://github.com/flekschas/svelte-simple-modal/pull/75). 🙏

# 1.3.1

- Updated `sveld` to fix the type definitions (#58). See https://github.com/carbon-design-system/sveld/issues/56 for context

# 1.3.0

- Add `classBg`, `classWindow`, `classWindowWrap`, `classContent`, and `classCloseButton` properties to applying custom CSS classes to the modal elements (#62)
- Add `unstyled` to prevent applying default styles and providing full control over the modal styling

# 1.2.0

- Add `ariaLabel` and `ariaLabelledBy` to props/options to support improved accessibility (#37)
- Add `aria-label="Close modal"` to the default close button component (#37)

# 1.1.3

- Add `"type": "module"` in `package.json` (#57)

# 1.1.2

- Properly export `bind()` (#58)

# 1.1.1

- Add type annotations via JSDocs, Typescript, and Sveld (#52)

# 1.1.0

- Add `disableFocusTrap` property for disabling the focus trap behavior (#49)

# 1.0.4

- Make sure that the modal only closes when it's open to fix (#53)

# 1.0.3

- Remove accidentally added `console.log` (#50) and forbid `console.log` via linting

# 1.0.2

- Revert changes from v1.0.1 as it turns out that in certain cases `overflow: hidden` on body is not enough to prevent background scrolling in iOS. For details see https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/

# 1.0.1

- Remove `position: fixed` from body on opening a modal as it appears that the fixed positioning is not needed to avoid scrolling (#38)

# 1.0.0

Woohoo 🎉 Thanks everyone who uses and supports this library. This release
really just introduces a bug fix but given that most (hopefully all 🤞) of the
features are stable, I decided to finally release v1.

- Fixes a scrolling issue introduced with #45 while still keeping the library compatible with SvelteKit (#47)

# 0.10.4

- Default bg width/height to innerWidth/innerHeight (#40)
- Make compatible with svelte kit (#45)

# 0.10.3

- Avoid exception when converting falsy value to CSS (#42)

# 0.10.2

- Improve outer click handling and avoid accidental closing of the modal (#39)

# 0.10.1

- Harmonize `on:open`/`on:opening` and `on:close`/`on:closing` event (#33 and #34). Note, `on:opening` and `on:closing` are still being dispatched for backward compatibility but they will be remove in future versions so please switch over to `on:open` and `on:close`.

# 0.10.0

- Disable body scrolling while modal is open (#31 -> #28)
- Fixed a visual glitch where previously customized styles were not reset

# 0.9.0

- Added `<Modal show={PopupComponent} />` as an alternative to other the context API (#22)

# 0.8.1

- Replace too strict `isSvelteComponent` with `isFunction` (#27)

# 0.8.0

- Dispatch open, opened, close, and closed events (#25)

# 0.7.0

- Allow customizing the window wrapper via `styleWindowWrap` (#24)

# 0.6.1

- Fall back gracefully for older versions of Svelte (`<3.19`) when `SvelteComponent` for the custom close button is not available (#21)

# 0.6.0

- Allow customizing the close button (#20)

# 0.5.0

- Trap focus in modal (#17)
- Add `aria` information

# 0.4.2

- Explicitly expose the `event` object (#13)

# 0.4.1

- Remove wrapping `div` element as it's not necessary (#12)

# 0.4.0

- Add support for transition event callbacks via [`open(..., ..., ..., { onOpen, onOpened, onClose, onClosed })`](README.md#open))

# 0.3.1

- Fix non-reactive component (#11)

# 0.3.0

- Allow to specify instance-specific options via [`open(Component, componentProps, options)`](README.md#open))

# 0.2.2

- Update `package-lock.json` file

# 0.2.1

- Set backgroupd position to `top: 0` and `left: 0` by default thanks to https://github.com/flekschas/svelte-simple-modal/pull/5

# 0.2.0

- Allow customizing the modal style on `open(Component, props, styling)`. This can be used for content-aware theming.

# 0.1.1

- Robustify overflow

# 0.1.0

- First release
