import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/apiauth': 'http://localhost:8080',
            '/apimsg': 'http://localhost:5020'
        }
    },
    plugins: [react()],
})
