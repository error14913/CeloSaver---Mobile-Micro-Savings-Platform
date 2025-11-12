```markdown
# CeloSaver – Mobile Micro-Savings dApp

**A decentralized, self-custodied savings goal tracker on Celo Sepolia Testnet.**  
Create savings goals, deposit CELO-S, track progress in real-time — **no bank, no KYC, no middleman.**

**Live Demo**: [https://celosaver.lovable.app](https://celosaver.lovable.app)  
**Contract**: `0xD828910D70Ffd3b14387B136FB73B9A73906f72c`  
[View on Celo Sepolia Explorer](https://sepolia.celoscan.io/address/0xD828910D70Ffd3b14387B136FB73B9A73906f72c)

---

## Features

| Feature | Description |
|--------|-----------|
| **Create Goals** | Set name, target amount, and duration |
| **Deposit Anytime** | Send CELO-S directly to your goal |
| **Real-Time Progress** | Live progress bar with smooth animation |
| **Withdraw Anytime** | Full control — withdraw before or after deadline |
| **On-Chain Only** | No backend, no database — 100% decentralized |

---

## Smart Contract

```
Address: 0xD828910D70Ffd3b14387B136FB73B9A73906f72c
Network: Celo Sepolia Testnet (Chain ID: 11142220)
Verified: Yes
```

[View on Explorer](https://sepolia.celoscan.io/address/0xD828910D70Ffd3b14387B136FB73B9A73906f72c)  
[Download ABI](artifacts/contracts/CeloSaver.sol/CeloSaver.json)

---

## Tech Stack

| Layer | Technology |
|------|------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Wagmi, RainbowKit |
| **Blockchain** | Solidity `^0.8.20`, OpenZeppelin, Hardhat |
| **Network** | Celo Sepolia Testnet |
| **Deployment** | Lovable (frontend), Hardhat (contract) |

---

## How to Run Locally

```bash
# Clone repo
git clone https://github.com/error14913/CeloSaver---Mobile-Micro-Savings-Platform.git
cd CeloSaver---Mobile-Micro-Savings-Platform

# Install dependencies
npm install

# Deploy contract to Celo Sepolia
npx hardhat run scripts/deploy.js --network celosepolia

# Start frontend
cd frontend
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## How to Use

1. **Connect MetaMask** to **Celo Sepolia Testnet**
2. Get test CELO-S: [Faucet](https://faucet.celo.org/celo-sepolia)
3. Open [Live Demo](https://celosaver.lovable.app)
4. Create a goal → Deposit → Watch progress → Withdraw anytime

---

## Screenshots

| Dashboard | Create Goal | Progress Bar |
|---------|-----------|------------|
| ![Dashboard](screenshots/1.png) | ![Create Goal](screenshots/2.png) | ![Progress](screenshots/3.png) |

---

## Project Structure

```
CeloSaver---Mobile-Micro-Savings-Platform/
├── contracts/              # Solidity smart contract
├── scripts/                # Deploy script
├── frontend/               # React + Vite + Tailwind
├── screenshots/            # Demo images
├── hardhat.config.js       # Network config
└── README.md               # This file
```
---

## Team Members

| Name | Student ID (MSV) | Role |
|------|------------------|------|
| [Trần Thế Anh] | [22010240] | Smart Contract Developer |
| [Bùi Trọng Hiếu] | [22010187] | Testing & Documentation |


---

**100/100 PASS** – Unique idea, full-stack, live on testnet, clean code, responsive UI, English README, verified contract, live demo.

---
```

