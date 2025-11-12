import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { celoSepolia } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'CeloSaver',
  chains: [celoSepolia],
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
);