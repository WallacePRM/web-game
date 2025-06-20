# Real-Time Game Events - WebSocket Learning Project 🎮🌐

Este é um projeto experimental criado com o objetivo de **aprender e praticar a interação com APIs em tempo real utilizando WebSocket**, simulando a recepção e o tratamento de eventos de um jogo online.

---

## 🎯 Objetivo do Projeto

- Aprender como funciona a comunicação em **tempo real via WebSocket**.
- Simular um **servidor de eventos de jogo**, que envia dados representando ações de jogadores.
- Criar um **cliente WebSocket** que:
  - Recebe os eventos.
  - Processa cada tipo de evento separadamente.

---

## 🧰 Tecnologias Utilizadas

- **JavaScript (Node.js)**
- **WebSocket (`ws` library)** – Biblioteca WebSocket para Node.js.

---

## 📡 Como funciona o fluxo de eventos

O projeto consiste em **dois componentes principais**:

1. **Servidor WebSocket de Teste (simulando o jogo)**
   Envia eventos de exemplo com diferentes tipos (`ENTER`, `MOVE`, `STOP_MOVE`, `MSG`, `LEAVE`).

2. **Cliente WebSocket (o projeto em si)**
   Conecta-se ao servidor, escuta os eventos, aplica filtros de repetição e executa as ações simuladas correspondentes.

---

## 🕹️ Tipos de Eventos Simulados

| Tipo de Evento | Descrição                          |
|----------------|------------------------------------|
| `ENTER`        | Jogador entrou no ambiente do jogo|
| `MOVE`         | Jogador começou a se mover        |
| `STOP_MOVE`    | Jogador parou de se mover         |
| `MSG`          | Jogador enviou uma mensagem       |
| `LEAVE`        | Jogador saiu do ambiente do jogo  |

---

## ✅ Funcionalidades já implementadas

- Conexão cliente-servidor via WebSocket.
- Recebimento e parsing de mensagens de eventos.
- Logs detalhados no console para acompanhar o fluxo de eventos.

---

## 🚀 Como executar o projeto

### Pré-requisitos:

- **Node.js** instalado.

### Instalação:

```bash
git clone https://github.com/WallacePRM/web-game.git
git clone https://github.com/WallacePRM/weG-gamer-server.git
cd web-game
npm install
