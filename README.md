# 🎬 MovieFans – Plataforma de Gestão de Filmes

## 📖 Descrição | Description

**PT:**  
MovieFans é uma aplicação web desenvolvida como trabalho acadêmico que permite o cadastro, exibição e gerenciamento de filmes e gêneros, com áreas públicas e um backoffice protegido.  

**EN:**  
MovieFans is a web application developed as an academic project that allows the registration, display, and management of movies and genres, with public and admin-protected areas.

---

## 🚀 Tecnologias | Technologies

- ⚙️ Backend: Node.js, Express, PostgreSQL, Sequelize  
- 🎨 Frontend: React, Bootstrap  
- 🔐 Autenticação: JWT  
- 🧩 Arquitetura: MVC  
- 🌐 API RESTful

---

## 🛠️ Instalação Local | Local Installation

### 1. Clonar o repositório | Clone the repository:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Configurar variáveis de ambiente | Set up environment variables:

**Crie um arquivo `.env` em `/backend` com:**

```
DB_NAME=ai2
DB_USER=postgres
DB_PASS=suasenha
DB_HOST=localhost
```

> ⚠️ Não compartilhe seu `.env` no repositório.

### 3. Instalar dependências | Install dependencies:

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

## ▶️ Execução | Running the App

### Backend:

```bash
cd backend
npm start
```

### Frontend:

```bash
cd ../frontend
npm start
```

---

## 📂 Estrutura | Structure

```
trabalhof7-server/
│
├── backend/
│   ├── src/
│   └── .env
│
├── frontend/
│   ├── src/
│   └── public/
```

---

## 🔒 Área Administrativa | Admin Area

- **Login necessário**
- Possui gestão de:
  - Filmes (CRUD)
  - Gêneros (CRUD)
  - Destaques e carrossel

---

## 📚 Créditos | Credits

Desenvolvido por Gabriel Maciel para a disciplina de Aplicações para a Internet II.
Curso: Engenharia Informática – ESTGV

---

## 📄 Licença | License

Este projeto é apenas para fins educativos.  
This project is for educational purposes only.
