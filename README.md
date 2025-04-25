# 🛒 NexusStore

**NexusStore** é um protótipo de e-commerce moderno, minimalista e responsivo, desenvolvido como projeto da disciplina de **Aplicações com Interfaces Ricas**.

Este projeto visa demonstrar o funcionamento básico de uma loja virtual, incluindo listagem de produtos, carrinho de compras, e um processo de checkout simulado. Ele não tem fins comerciais — é apenas para fins acadêmicos e práticos.

---

## 🚀 Tecnologias Utilizadas

- [Angular](https://angular.io/) – Framework front-end baseado em componentes
- [TypeScript](https://www.typescriptlang.org/) – Superset do JavaScript com tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitário para estilização rápida

> Outras ferramentas e bibliotecas complementares poderão ser adicionadas conforme o projeto evolui, como:
> - Angular Material ou PrimeNG (componentes de UI)
> - JSON-Server ou Firebase (mock-backend REST)
> - NgRx (gerenciamento de estado)
> - ngx-webstorage (persistência local)

---

## 📁 Estrutura (Provisória)

```bash
nexusstore/
├── src/
│   ├── app/
│   │   ├── components/        # Componentes reutilizáveis (Navbar, Card, etc)
│   │   ├── pages/             # Páginas principais (Home, Produtos, Carrinho, Checkout)
│   │   ├── services/          # Comunicação com backend ou mock
│   │   ├── models/            # Interfaces e tipos TypeScript
│   │   ├── guards/            # Proteção de rotas
│   │   ├── store/             # Estado da aplicação (NgRx - opcional)
│   │   └── app-routing.module.ts
│   ├── assets/                # Imagens e arquivos estáticos
│   ├── styles/                # Configurações do Tailwind ou SCSS
│   └── index.html
├── db.json                    # Mock-backend (JSON-Server)
├── angular.json
├── package.json
└── README.md
```

---

## 🧪 Funcionalidades Planejadas

- [ ] CRUD de produtos
- [ ] Carrinho de compras com persistência local
- [ ] Checkout com formulário reativo
- [ ] Autenticação mock e rotas protegidas
- [ ] Filtro e busca de produtos
- [ ] Testes unitários de componentes e serviços

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para abrir issues com sugestões, melhorias ou correções, e enviar pull requests quando quiser colaborar.


