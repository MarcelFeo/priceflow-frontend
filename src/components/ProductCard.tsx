import { TrendingDown, TrendingUp, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/api";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getPlatform(url: string) {
  if (url.includes("amazon")) return "Amazon";
  if (url.includes("mercadolivre") || url.includes("mercadolibre")) return "Mercado Livre";
  return "E-commerce";
}

export default function ProductCard({ product }: { product: Product }) {
  const prices = product.history.map((h) => h.price);
  const first = prices[0] ?? 0;
  const last = prices[prices.length - 1] ?? 0;
  const diff = last - first;
  const isDown = diff < 0;
  const platform = getPlatform(product.url);

  return (
    <div className="glass rounded-lg p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="text-xs font-medium text-primary/80 uppercase tracking-wider">
            {platform}
          </span>
          <h3 className="text-foreground font-semibold mt-1 truncate">{product.name}</h3>
          <p className="text-muted-foreground text-sm mt-1 truncate">{product.email}</p>
        </div>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors shrink-0"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{formatPrice(last)}</p>
          {prices.length > 1 && (
            <div className={`flex items-center gap-1 mt-1 text-sm ${isDown ? "text-primary" : "text-destructive"}`}>
              {isDown ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
              <span>{formatPrice(Math.abs(diff))}</span>
            </div>
          )}
        </div>
        <div className="flex items-end gap-[3px] h-8">
          {prices.slice(-8).map((p, i) => {
            const max = Math.max(...prices);
            const min = Math.min(...prices);
            const range = max - min || 1;
            const height = ((p - min) / range) * 100;
            return (
              <div
                key={i}
                className="w-1.5 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors"
                style={{ height: `${Math.max(height, 15)}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
