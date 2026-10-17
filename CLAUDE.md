# CLAUDE.md — @hyoper/rn-animated-modal

Notes for future Claude sessions working on this repo. Keep this file current when architecture changes.

## What it is
- npm package `@hyoper/rn-animated-modal` (v1.1.1, MIT, author hyoper). Repo: github.com/hyoper/react-native-animated-modal. Docs: hyoper.github.io/react-native-animated-modal (TypeDoc, `docs` branch).
- A React Native `Modal` replacement built on RN's own `<Modal transparent animationType="none">`, with:
  - enter/exit animations (fade / slide / scale) via **Reanimated** shared values + `withTiming`
  - swipe-to-dismiss via **Gesture Handler** `Gesture.Pan()`
  - an animated, pressable backdrop
  - "Scrollable" wrappers so a list inside the modal and the modal's pan gesture work **simultaneously** (bottom-sheet behaviour).
- Peer deps: react >=18.2, react-native >=0.78, gesture-handler >=2.26, reanimated >=3.19. Optional: `@shopify/flash-list` >=2.0.1, `@legendapp/list` >=2.0.0 (loaded with `try { require(...) }`, throw only when the component is rendered).

## Commands (root)
- `npm run test:ts` → `tsc --noEmit`; `npm run test:lint` → `eslint --ext ts,tsx src/` (check only, no `--fix`; library source only, `example/` is not linted). **No unit tests exist.** Run both after any change to `src/`.
- `npm run build` → react-native-builder-bob, targets `module` + `typescript` into `lib/` (gitignored). `prepublishOnly` cleans + builds; `npm run release` publishes public.
- `npm run docs` → TypeDoc (`typedoc.js`, custom plugin `typedoc-front-matter.mjs` which renames README to "Home" via `projectDetails`). `docs:deploy` → gh-pages `docs` branch.
- package.json `react-native` / `source` field points at `src/index.ts`; `main`/`module` at `lib/module/index.js`.

## Code style
- Prettier: single quotes, no bracket spacing (`{a}`), trailing commas, `arrowParens: avoid`, `bracketSameLine: true`.
- ESLint: `@react-native` + `@typescript-eslint/recommended` + prettier. `curly: multi-line` (single-line `if (x) return;` is the norm). `any` / unused vars are warnings.
- TypeScript 5.0.4, strict.
- Each component lives in `src/components/<Name>/index.tsx` + `index.type.ts`.
- Prop typing pattern: `XProps` (public, all optional) → `XRequiredProps` (get defaults) + `XPartialProps` → `XStrictProps`. Defaults are merged with `getSafeProps(props, defaults)` (fills only `null/undefined`).
- Public config types are namespaces: `AnimationNs`, `SwipeNs`, `BackdropNs` (src/types.ts), plus `ScrollableNs`, `ScrollableFlatListNs`, etc. `Config` = user-facing partial, `ConfigStrict` = fully resolved.
- Internal symbols are tagged `@hidden` in TSDoc so TypeDoc skips them. Worklets are marked with `'worklet'`.

## Public API (src/index.ts)
`Modal`, `Scrollable`, `ScrollableFlatList`, `ScrollableView`, `ScrollableSectionList`, `ScrollableFlashList`, `ScrollableLegendList`, and types `AnimationNs`, `SwipeNs`, `BackdropNs` (+ each component's own Ns/Props types).

## Architecture
```
Modal (components/Modal)
 ├─ useAnimationValues()   shared values: status, size, translateX/Y, opacity, scale,
 │                         scroll, scrollInteraction, scrollLock, scrollOffset, scrollOrientation
 │                         (+ Dimensions 'change' listener updates size)
 ├─ useAnimationConfig / useSwipeConfig / useBackdropConfig  → merged + ref-cached configs
 ├─ useAnimation()  → {init, enter, exit} worklets (run with runOnUI from effects)
 ├─ useGesture()    → {native, pan, nativeRef, panRef}
 └─ <RNModal visible={_visible}>
      <GestureHandlerRootView>
        <ConfigProvider value={swipe, animation, backdrop}>
          <ShareProvider value={shared values + gestures}>
            <Backdrop/>                        (BackdropSimple | BackdropNone)
            <GestureDetector gesture={pan}>
              <Content style>{children}</Content>   (Animated.View; opacity/translate/scale)
```
- Two contexts (`src/context`): **ConfigContext** (resolved configs) and **ShareContext** (shared values + gestures). Both throw if used outside the provider.

### Visibility lifecycle (Modal/index.tsx)
- `visible` prop is the user's intent; internal `_visible` state + `_visibleRef` drive the native Modal so it stays mounted during the exit animation.
- `visible → true`: effect runs `init()` (sets start values), then `enter()`. `onEnterStart` → `handleShow` → `onShow` + `_visible = true` (onShow fires at **start** of enter).
- `visible → false`: `exit()` (guarded by `status === 'exiting'`). `onExitEnd` → `handleHide` → `onHide` + unmount native modal.
- `status` shared value: `'idle' | 'entering' | 'exiting'`; gestures are ignored unless `idle`.
- Swipe close path: pan `onEnd` sets `status='exiting'`, animates off-screen, then `handleSwipeComplete` → `onSwipeComplete` + `_visible=false` directly. Since `_visibleRef` is already false, the later `exit()`'s `onExitEnd` does **not** call `onHide` → after a swipe-close, `onHide` is not fired (only `onSwipeComplete`). A `setTimeout(0)` in useGesture resets status/direction/scroll lock.
- `onBackPress` is wired to RN Modal `onRequestClose`. Defaults: `statusBarTranslucent` and `navigationBarTranslucent` = true. Remaining RN Modal props pass through via `...rest`.

### Animations (hooks/useAnimation.ts, utils.ts, constants.ts)
- Duration default 350. Easing per type: fade `out(cubic)`, slide/scale `inOut(ease)`.
- fade: opacity 0↔1. scale: scale 0↔1. slide: translate by full window size.
- Slide `direction` is either a string (same side in/out) or `{start, end}`. `SlideMovement.get(size)` = `{up: +h, down: -h, left: +w, right: -w}` (start offsets, "up" means *comes up from below*). For `{start,end}` the exit uses `getReflect` (signs reversed) with `direction.end`.
- Default animation type when none given: fade.

### Swipe (hooks/useGesture.ts)
- Enabled only if `swipe.enabled && directions.length >= 1`.
- `SWIPE_LOCK_THRESHOLD = 8px` before anything moves. First axis moved is locked (`axisLock`); direction can flip only along the locked axis. Moving in a non-allowed direction sets `directionBreak` → no dismiss.
- Translation is clamped one-sided (e.g. `down` → `max(0, ty)`).
- On end: dismiss if (`|translation| > swipe.distance` **or** the modal moved in the locked direction and release velocity in that direction `> swipe.velocity`) **and** `closable` **and** not broken; animates to ±window size, else springs back (withTiming, same duration). Calls `onSwipeComplete` / `onSwipeCancel`.
- Defaults: if `enabled` → `SWIPE_ENABLED_CONFIG` (all 4 directions, closable **true**, distance 120, velocity 800); else disabled config (closable false). So the effective `closable` default depends on `enabled` (types' JSDoc says `false`).

### Scrollables (components/Scrollable*)
- `<Scrollable orientation inverted onScroll onBeginDrag onEndDrag onMomentumBegin onMomentumEnd>{options => <ScrollableFlatList {...options} .../>}</Scrollable>` — render-prop; user **must spread `options`** onto the child.
- `options`: `horizontal`, `inverted`, `pointerEvents` (`'none'` while modal pan has taken over), `scrollEventThrottle: 16`, bounces off, `onLayout`, `onContentSizeChange`, `onScroll` (Reanimated `useAnimatedScrollHandler`), `renderScrollComponent` (GH `ScrollView` with `simultaneousHandlers={panRef}`).
- Scrollable wraps children in `<GestureDetector gesture={native}>`; the modal pan is `simultaneousWithExternalGesture(native)`. Native gesture `onTouchesDown/Up` toggles `scrollInteraction`.
- Scroll position → `scroll` shared value: `'top' | 'bottom' | 'left' | 'right' | 'middle' | 'none'` (1px tolerance; inverted swaps). `onContentSizeChange` sets initial boundary or `'none'` if content fits.
- Coordination in pan `onUpdate`: if the list is in `'middle'` and the gesture is on the list's axis, pan translation is accumulated into `scrollOffset` (modal doesn't move). At the edge, the modal moves and `scrollLock = true` → Scrollable reacts (`useAnimatedReaction`) and disables list touches (`pointerEvents none`) until gesture ends.
- Child components are just `Animated.createAnimatedComponent` wrappers (FlatList, SectionList, ScrollView, FlashList) with `forwardRef` + generic casts; LegendList uses `@legendapp/list/reanimated`'s `AnimatedLegendList`. `ScrollableView` is RN ScrollView, so the passed `renderScrollComponent` is ignored there.
- Only one Scrollable per Modal is effectively supported (single shared `scroll*` state).

### Backdrop
- `BackdropSimple`: absolute `Animated.View` with backgroundColor + `TouchableOpacity activeOpacity=1` → `onBackdropPress`. Opacity is derived from the animation: fade/scale interpolate 0→`backdrop.opacity`; slide = `opacity - distance / (diag * 0.6)` (fades as content is dragged/slid away; not clamped).
- `BackdropNone` (enabled=false): plain empty absolute view, no press handler → `onBackdropPress` never fires.
- Defaults: enabled true, black, opacity 0.6.

### Config caching (utils.isObjectEqual = JSON.stringify compare)
- `useAnimationConfig`, `useSwipeConfig`, `useBackdropConfig` all compare the **merged** config (`configNew`) with the cached one and return the cached reference when equal, so inline config objects don't rebuild gestures every render.

## Example app (example/)
- RN 0.79.6 CLI app (`ExampleApp`), React 19, reanimated 3.19.1, GH 2.27.2, flash-list 2.3.2, legend-list 2.0.19, keyboard-controller, safe-area-context.
- Consumes library **source** directly: babel `module-resolver` alias + tsconfig `paths` → `../src/index`; metro `watchFolders: [..]`, blocks root `node_modules` copies of peer deps and maps them to example's node_modules (avoid duplicate React/Reanimated).
- No navigation lib: `Main.tsx` switches pages by name. Pages: Animation, Backdrop, Swipe (foundation), FlatList, ScrollView, SectionList, FlashList, LegendList (scrollables), TextInput, BottomSheet (other). Most have a `Configuration.tsx` playground. Shared UI in `example/src/commons` (Button, Card, Screen with Header/Title/Subtitle/Content), styles in `pages/styles.ts`.
- Run: `cd example && npm i && (cd ios && pod install) && npm run ios|android`.

## Known loose ends / ideas
- None open. Fixed after first review (branch `fix/velocity`): `swipe.velocity` now used for fling-to-dismiss, swipe/backdrop config cache compares the merged config, `Scrollable.orientation` JSDoc.

## Roadmap
- Plan: keep two release lines. **1.x → Reanimated 3** (maintenance, critical fixes only), **2.x → Reanimated 4** (New Architecture only, needs `react-native-worklets`).
- v2 code changes expected: `runOnJS(fn)(arg)` → `scheduleOnRN(fn, arg)` and `runOnUI(fn)()` → `scheduleOnUI(fn)` from `react-native-worklets`; babel plugin → `react-native-worklets/plugin` (root + example); peer deps, README requirements table, example app versions. Public props API should stay the same.
- Releasing 1.x after 2.x exists must use a dist-tag (e.g. `npm publish --access public --tag v1`), otherwise `latest` moves back to 1.x.

Confirmed **intentional by the author** (do not flag as bugs): `onHide` not firing after swipe-close, `closable` default depending on `enabled`, `[]` deps in `useScroll`, `BackdropNone` having no press handler / ignoring props, unused Modal styles, no tests/CI.
