# 🛒 NexusStore

**NexusStore** é um protótipo de e-commerce moderno, minimalista e responsivo, desenvolvido como projeto da disciplina de **Aplicações com Interfaces Ricas**.

Este projeto visa demonstrar o funcionamento básico de uma loja virtual, incluindo operações CRUD completas para gerenciamento de produtos. Ele não tem fins comerciais — é apenas para fins acadêmicos e práticos.

## 🚀 Tecnologias Utilizadas

- **Angular 17** – Framework front-end baseado em componentes
- **TypeScript** – Superset do JavaScript com tipagem estática
- **PrimeNG** – Biblioteca de componentes UI rica e moderna
- **Tailwind CSS** – Framework CSS utilitário para estilização rápida
- **RxJS** – Programação reativa para gerenciamento de estado

## 🧪 Funcionalidades Implementadas

- ✅ **CRUD Completo de Produtos**
  - ✅ Criar novos produtos
  - ✅ Listar produtos com paginação e filtros
  - ✅ Visualizar detalhes do produto
  - ✅ Editar produtos existentes
  - ✅ Excluir produtos com confirmação

- ✅ **Interface Rica com PrimeNG**
  - ✅ Tabela de dados com ordenação e filtros
  - ✅ Formulários reativos com validação
  - ✅ Componentes de UI modernos (Cards, Buttons, Tags, etc.)
  - ✅ Notificações toast e diálogos de confirmação

- ✅ **Modelo de Dados Completo**
  - ✅ **String**: Nome, Descrição, Categoria, URL da Imagem
  - ✅ **Number**: Preço, Estoque, ID
  - ✅ **Boolean**: Status Ativo/Inativo

## 📁 Estrutura do Projeto

\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── header/              # Cabeçalho da aplicação
│   │   ├── product-list/        # Listagem de produtos
│   │   ├── product-form/        # Formulário de criação/edição
│   │   └── product-detail/      # Detalhes do produto
│   ├── models/
│   │   └── product.model.ts     # Interface do modelo Product
│   ├── services/
│   │   └── product.service.ts   # Serviço para operações CRUD
│   ├── app.component.ts         # Componente raiz
│   └── app.routes.ts           # Configuração de rotas
├── styles.css                  # Estilos globais
└── main.ts                     # Bootstrap da aplicação
\`\`\`

## 🎯 Modelo de Dados

O modelo `Product` implementa os requisitos da atividade:

\`\`\`typescript
interface Product {
  id: number;           // Identificador único
  nome: string;         // Nome do produto (string)
  descricao: string;    // Descrição detalhada (string)
  preco: number;        // Preço do produto (number)
  categoria: string;    // Categoria do produto (string)
  ativo: boolean;       // Status ativo/inativo (boolean)
  estoque: number;      // Quantidade em estoque (number)
  imagemUrl?: string;   // URL da imagem (string opcional)
  dataCriacao: Date;    // Data de criação
}
\`\`\`

## 🚀 Como Executar

1. **Clone o repositório:**
   \`\`\`bash
   git clone https://github.com/seu-usuario/nexus-store.git
   cd nexus-store
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Execute o projeto:**
   \`\`\`bash
   ng serve
   \`\`\`

4. **Acesse no navegador:**
   \`\`\`
   http://localhost:4200
   \`\`\`

## 📱 Funcionalidades da Interface

### Listagem de Produtos
- Tabela responsiva com paginação
- Filtro de busca global
- Ordenação por colunas
- Tags coloridas para status e categoria
- Ações rápidas (visualizar, editar, excluir)

### Formulário de Produto
- Validação reativa em tempo real
- Campos obrigatórios marcados
- Dropdown para seleção de categoria
- Input numérico para preço e estoque
- Switch para status ativo/inativo
- Preview de URL de imagem

### Detalhes do Produto
- Visualização completa das informações
- Layout responsivo com imagem
- Informações organizadas em cards
- Ações contextuais (editar, duplicar, excluir)

## 🎨 Design e UX

- **Design Moderno**: Interface limpa e profissional usando PrimeNG
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessibilidade**: Componentes seguem padrões de acessibilidade
- **Feedback Visual**: Notificações, confirmações e estados de loading
- **Navegação Intuitiva**: Breadcrumbs e botões de ação claros

## 📚 Conceitos Aplicados

- **Componentes Standalone**: Arquitetura moderna do Angular 17
- **Programação Reativa**: Uso de RxJS e Observables
- **Formulários Reativos**: Validação e controle de estado
- **Roteamento**: Navegação entre páginas com parâmetros
- **Serviços**: Injeção de dependência e separação de responsabilidades
- **TypeScript**: Tipagem forte e interfaces bem definidas

## 🎓 Objetivos Acadêmicos Atendidos

- ✅ Projeto Angular criado e versionado no GitHub
- ✅ Biblioteca PrimeNG integrada e utilizada
- ✅ Operações CRUD completas implementadas
- ✅ Modelo com atributos string, number e boolean
- ✅ Interface rica e responsiva
- ✅ Código bem estruturado e documentado

---

**Desenvolvido por:** [Seu Nome]  
**Disciplina:** Aplicações com Interfaces Ricas  
**Instituição:** [Nome da Faculdade]  
**Ano:** 2024
