import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import App from './App.jsx';
import { queryClient } from "./api/api.js";

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
