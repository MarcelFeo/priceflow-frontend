# PricePal - Plataforma de Comparação de Preços

Uma aplicação web moderna para comparação de preços de produtos, construída com React, TypeScript e Vite.

## 🎯 Sobre o Projeto

PricePal é uma plataforma que permite aos usuários comparar preços de produtos de forma rápida e intuitiva. A aplicação oferece uma interface responsiva e amigável, facilitando a busca pelos melhores preços disponíveis no mercado.

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset de JavaScript com tipagem estática
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework de CSS utilitário
- **Bun** - Package manager e runtime JavaScript rápido
- **Vitest** - Framework de testes unitários

## 📦 Dependências Principais

- React Router para navegação
- Shadcn/ui para componentes de UI reutilizáveis
- Sonner para notificações toast
- ESLint para linting de código

## 🚀 Como Começar

### Pré-requisitos

- [Bun](https://bun.sh) instalado na sua máquina

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd price-pal-96-main
```

2. Instale as dependências:
```bash
bun install
```

3. Inicie o servidor de desenvolvimento:
```bash
bun run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React reutilizáveis
│   ├── ui/             # Componentes de UI (biblioteca Shadcn)
│   ├── ProductCard.tsx # Cartão de produto
│   └── NavLink.tsx     # Link de navegação
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   └── NotFound.tsx    # Página 404
├── hooks/              # Custom hooks
│   ├── use-mobile.tsx  # Hook para detecção de mobile
│   └── use-toast.ts    # Hook para notificações
├── lib/                # Utilitários e APIs
│   ├── api.ts          # Chamadas à API
│   └── utils.ts        # Funções utilitárias
├── test/               # Testes automatizados
├── App.tsx             # Componente raiz
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Componentes Disponíveis

A aplicação utiliza uma biblioteca completa de componentes UI em `src/components/ui/`, incluindo:

- Accordion
- Alert Dialog
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Dialog
- Drawer
- Dropdown Menu
- Form
- Input
- Pagination
- Select
- Sidebar
- Tabs
- Table
- Toast/Toaster
- E muitos outros...

## 🧪 Testes

Execute os testes com:

```bash
bun run test
```

Para executar testes em modo watch:

```bash
bun run test:watch
```

## 🔧 Configurações

### Tailwind CSS

Personalize os estilos editando `tailwind.config.ts`

### TypeScript

Ajuste as configurações de compilação em `tsconfig.json`

### Vite

Configure o build em `vite.config.ts`

## 🌐 Build para Produção

Crie a build otimizada para produção:

```bash
bun run build
```

Para visualizar a build:

```bash
bun run preview
```

## 🔍 Linting e Formatação

Verifique a qualidade do código:

```bash
bun run lint
```

## 📝 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias:

```
VITE_API_URL=http://localhost:3000
```

## 🤝 Contribuindo

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Autores

- Equipe PricePal

## 📞 Suporte

Para questões e sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando React e Vite**
