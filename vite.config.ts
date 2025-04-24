import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/acey_ducey/', // 設置 GitHub Pages 的基礎路徑
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
