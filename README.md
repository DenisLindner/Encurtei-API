<div align="center">
  <h1>🔗 Encurtei</h1>
  <p>Encurtador de links de alta performance e resiliência, desenhado a nível industrial.</p>
</div>

---

## 📖 Contexto

O **Encurtei** foi desenvolvido com o intuito de construir uma aplicação a **nível industrial**. Um encurtador de links não pode lidar com latências altas e deve suportar grandes volumes de tráfego, tanto para a criação contínua quanto para picos abruptos de leitura e redirecionamento.

Para lidar com esse cenário de hyper-escala:
- Suporta cerca de **20.000 requisições em 20 segundos** para a **criação de links**.
- Aguenta **140.000 requisições em 30 segundos** para **leitura/redirecionamento** via shortCode.
- A arquitetura utiliza **Redis** para a baixíssima latência na leitura de links (Cache In-Memory) em conjunto contínuo com **Apache Cassandra** garantindo uma altíssima performance de escrita e escalabilidade para a persistência definitiva dos dados.

## 🎯 Objetivo

Fornecer uma solução escalável, rápida e de arquitetura robusta para o encurtamento profissional de URLs. O projeto também serve para demonstrar a efetividade da combinação da camada de aplicação do NestJS com as engenharias sólidas do Redis e Cassandra para persistência e recuperação distribuída em cenários de estresse e grande demanda de rede.

## 🛠️ Stack e Bibliotecas

A aplicação utiliza as tecnologias mais eficientes do mercado atual:

- **Backend:** Node.js, [NestJS](https://nestjs.com/), TypeScript
- **Persistência / Banco de Dados NoSQL:** [Apache Cassandra](https://cassandra.apache.org/) (`cassandra-driver`) 
- **Cache in-memory:** [Redis](https://redis.io/)
- **Infraestrutura e Contêineres:** Docker, Docker Compose
- **Segurança e Validação:** `helmet`, `class-validator`, `class-transformer`, `throttler`

## 📡 Endpoints

O servidor expõe portas otimizadas para processar os payloads curtos com imensa velocidade.

### 1. Criar novo link encurtado
`POST /`

Recebe a URL a ser encurtada e devolve o acesso gerado em formato JSON.
> **Segurança**: Este endpoint possui Rate Limiting (limite de 4 requisições por minuto por IP) para prevenir abusos.

**Body (JSON) esperado:**
```json
{
  "url": "https://www.linkedin.com/in/denis-lindner/"
}
```
**Retorno exemplo:**
```json
{
  "shortUrl": "aB3x9Z"
}
```

### 2. Buscar o link original
`GET /:code`

Recebe o código gerado no Path Param. Busca ativamente pelo link original no Redis (fallback no Cassandra) e, para garantir máxima performance de comunicação via interface cliente, retorna os dados em formato JSON (a interface assume o redirecionamento).

## 🚀 Como Rodar

Este projeto depende de instâncias ativas do Redis e Cassandra. O projeto provê um arquivo do `docker-compose` preparado para subir a infraestrutura necessária de maneira simples.

### Pré-requisitos
- [Node.js](https://nodejs.org/en/) instalado
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/DenisLindner/encurtei.git
   cd encurtei/api
   ```

2. **Suba a infraestrutura via Docker:**
   Execute o container do Cassandra e Redis disponíveis na pasta docker:
   ```bash
   docker-compose -f docker/docker.compose.yml up -d
   ```
   > **Aviso:** O Cassandra pode demorar alguns minutos até inicializar e ficar completamente pronto para conexões devido à criação dos nós.

3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo `.env.example` para `.env` e configure conforme sua instalação:
   ```bash
   cp .env.example .env
   ```
   *(A porta `9042` do Cassandra e a `6379` do Redis já estão predefinidas pelo Docker).*

4. **Instale as Dependências do Projeto:**
   ```bash
   npm install
   ```

5. **Inicie a Aplicação:**
   ```bash
   npm run start:dev
   ```

*(A API estará escutando e aceitando as requisições na porta padrão configurada no seu `.env`, que tem base no Node na porta `3333`)*.

---

## 📬 Contato

<div align="center">
  <a href="https://github.com/DenisLindner/" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/denis-lindner/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href="mailto:lindnerdenis19@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <br/>
  Criado e mantido por <strong>Denis Lindner</strong>.
</div>
