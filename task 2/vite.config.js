// import react, { reactCompilerPreset, defineConfig } from '@vitejs/plugin-react'
// import babel from '@rolldown/plugin-babel'
// import { defineConfig } from 'vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     babel({ presets: [reactCompilerPreset()] }),
//     base: '/task%202/',
//   ],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ReactJS/',
})