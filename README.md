# 🚀 Vanilla NodeJS Task Manager API

API RESTful para gerenciamento de tarefas (tasks), desenvolvida com **Node.js puro**, sem o uso de frameworks como Express ou Fastify.  
Este projeto é o primeiro desafio da trilha de Node.js do **Ignite - Rocketseat**.

## 📚 Sobre o desafio

Este projeto visa reforçar conceitos fundamentais de Node.js por meio da criação de uma API que realiza operações CRUD em tarefas, além de permitir a **importação em massa via CSV** utilizando Streams.

## ✅ Funcionalidades

- Criar uma nova tarefa
- Listar todas as tarefas
- Atualizar uma tarefa pelo `id`
- Remover uma tarefa pelo `id`
- Marcar/desmarcar uma tarefa como concluída
- Importar tarefas em massa por arquivo `.csv`

📥 Importação de CSV
A importação de tarefas por CSV é feita utilizando Streams com um comando dedicado:

```bash
npm run import:csv
```

O arquivo .csv de exemplo está disponível em: ./tasks_example.csv

As tasks devem conter no CSV as colunas: title,description

🧪 Testes via Insomnia
Um exemplo de collection do Insomnia com todas as rotas da API está disponível no repositório:

Arquivo: InsomniaCollectionExample.yaml

Basta importar no Insomnia para testar todas as funcionalidades da API.

