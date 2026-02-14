export const getApiUrl = () => {
  // 1. Si el usuario definió una URL manual, la usamos.
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  
  // 2. Si estamos en Vercel, usamos la URL automática del despliegue (sin el /api al final)
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  
  // 3. Localhost por defecto (sin el /api al final)
  return 'http://localhost:3000';
};

export const API_URL = getApiUrl();