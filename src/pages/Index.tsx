import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Loader2, BarChart3, ArrowRight, AlertTriangle, RefreshCw } from "lucide-react";
import { registerProduct, getProductsHistory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

export default function Index() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading: loadingHistory, isError, refetch, isFetching } = useQuery({
    queryKey: ["products-history"],
    queryFn: getProductsHistory,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });

  const mutation = useMutation({
    mutationFn: () => registerProduct(url, email),
    onSuccess: () => {
      toast.success("Produto registrado com sucesso!");
      setUrl("");
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["products-history"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Erro ao registrar produto");
    },
  });

  const isValidUrl = url.includes("amazon") || url.includes("mercadolivre") || url.includes("mercadolibre");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <BarChart3 className="text-primary" size={24} />
          <span className="text-foreground font-semibold text-lg">PriceFlow</span>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-start pt-20 px-6 pb-12">
        <div className="text-center max-w-2xl animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Monitore preços de
            <span className="text-primary"> qualquer produto</span>
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Cole o link de um produto da Amazon ou Mercado Livre e receba alertas quando o preço mudar.
          </p>
        </div>

        {/* Input Form */}
        <div className="w-full max-w-2xl mt-10 space-y-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="glass rounded-xl p-2 flex items-center gap-2 glow-primary animate-pulse-glow">
            <Search className="text-muted-foreground ml-3 shrink-0" size={20} />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Cole o link do produto aqui..."
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-3 px-2 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <div className="glass rounded-xl p-2 flex items-center gap-2 flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email para notificações"
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2 px-3 text-sm"
              />
            </div>
            <button
              onClick={() => mutation.mutate()}
              disabled={!isValidUrl || !email || mutation.isPending}
              className="bg-primary text-primary-foreground font-semibold px-6 rounded-xl flex items-center gap-2 disabled:opacity-40 hover:opacity-90 transition-opacity text-sm"
            >
              {mutation.isPending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  Monitorar
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* History */}
        <div className="w-full max-w-5xl mt-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Produtos monitorados
            {data?.totalProducts != null && (
              <span className="text-muted-foreground font-normal text-base ml-2">
                ({data.totalProducts})
              </span>
            )}
          </h2>

          {loadingHistory ? (
            <div className="flex justify-center py-12">
              <Loader2 className="text-primary animate-spin" size={28} />
            </div>
          ) : isError ? (
            <div className="glass rounded-xl p-12 text-center space-y-4">
              <AlertTriangle className="text-destructive mx-auto" size={32} />
              <p className="text-foreground font-medium">
                Não foi possível carregar os produtos
              </p>
              <p className="text-muted-foreground text-sm">
                A API pode estar temporariamente fora do ar. Tente novamente em alguns instantes.
              </p>
              <button
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
              >
                {isFetching ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} />
                )}
                Tentar novamente
              </button>
            </div>
          ) : data?.products?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.products.map((product, i) => (
                <ProductCard key={product.url + product.email} product={product} />
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl p-12 text-center">
              <p className="text-muted-foreground">
                Nenhum produto monitorado ainda. Cole um link acima para começar!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
