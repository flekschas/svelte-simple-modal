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
