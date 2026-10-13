# model-clip

An early prototype for **clipping 3D models in the browser**: a movable, rotatable cutting box is intersected with a glTF model using CSG ([`three-bvh-csg`](https://github.com/gkjohnson/three-bvh-csg)). The app is called **Beta 3D**.

> **中文简介**：浏览器端 3D 模型剖切的早期原型（2023）。用 React Three Fiber 渲染 glTF 模型，通过滑块调整“剪切盒”的位置和角度，再用 `three-bvh-csg` 的布尔交集（INTERSECTION）得到切出的部分。更完整的“剖面重建”方案见 [Web3D-CS](https://github.com/1uciuszzz/Web3D-CS)。

**Live demo:** https://model-clip.vercel.app — open the root page and use the top navigation (deep links such as `/clip` return 404 on that deployment).

## Pages

| Route | What it does |
|-------|--------------|
| `/` | Introductions (placeholder) |
| `/clip` | Loads the bundled sample model `public/datangpo.gltf` (≈ 19 MB) in an HDR environment (`public/env.hdr`, ≈ 18 MB). A blue wireframe box marks the cut; sliders move it (X / Y / Z) and rotate it (RX / RY / RZ, −180° to 180°). **剪切** (cut) intersects every mesh with the box; **重置** (reset) restores the defaults. |
| `/local-model` | Opens a local `.glb` / `.gltf` file and lists its meshes. Uses `window.showOpenFilePicker`, so it needs a Chromium-based browser. Clipping is not available on this page. |

## Run locally

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev --base /      # http://localhost:3030/
pnpm build --base /    # production build -> dist/
pnpm lint
```

> **Why `--base /`?** `vite.config.js` sets `base: "/model-clip/"` (left over from a GitHub Pages setup), but the router has no matching `basename` and the sample model is requested from `/datangpo.gltf`. With the default base the app renders a 404 page, so pass `--base /` (or change `base` in `vite.config.js`). The same applies to any deployment served from a domain root, such as Vercel.

The bundled assets (≈ 38 MB) make the first load slow.

## Tech stack

React 18 · Vite 4 · Material UI 5 · @react-three/fiber 8 + drei 9 · three.js r157 · three-bvh-csg · Redux Toolkit · React Router 6 · Tailwind CSS 3

## Status

A 2023 prototype, kept for reference. It is a CSG-only approach; the follow-up project [Web3D-CS](https://github.com/1uciuszzz/Web3D-CS) compares CSG with BVH-accelerated cross-section reconstruction.

## License

[MIT](LICENSE)
