import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'date-fns': 'date-fns/esm', // Utilise le module ES6 de `date-fns`
    },
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        rewrite(path) {
           
          return path.replace('api/','')
        },
      }
    }
  }
})
