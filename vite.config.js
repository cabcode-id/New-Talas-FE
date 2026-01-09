import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: 
  [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
    host: true,
    allowedHosts:[
      'ec2-35-95-122-169.us-west-2.compute.amazonaws.com',
      'localhost'
    ]
  }
})
