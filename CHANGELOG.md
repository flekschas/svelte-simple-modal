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
