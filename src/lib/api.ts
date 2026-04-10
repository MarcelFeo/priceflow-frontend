const API_URL = "https://priceflow-ari6.onrender.com/api";
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

function proxyUrl(path: string): string {
  const directUrl = `${API_URL}${path}`;
  // In dev with Vite proxy, use relative path; in preview, use CORS proxy
  if (import.meta.env.DEV) {
    return `/api${path}`;
  }
  return `${CORS_PROXY}${encodeURIComponent(directUrl)}`;
}

export interface PriceHistory {
  id: number;
  price: number;
  capturedAt: string;
}

export interface Product {
  url: string;
  email: string;
  name: string;
  lastPrice: number;
  history: PriceHistory[];
}

export interface ProductsResponse {
  totalProducts: number;
  products: Product[];
}

export async function registerProduct(url: string, email: string): Promise<Product> {
  const res = await fetch(proxyUrl("/products"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, email }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ${res.status}`);
  }
  return res.json();
}

export async function getProductsHistory(): Promise<ProductsResponse> {
  const res = await fetch(proxyUrl("/products/history"));
  if (!res.ok) throw new Error(`Erro ${res.status}`);
  return res.json();
}
