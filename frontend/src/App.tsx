import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0xD828910D70Ffd3b14387B136FB73B9A73906f72c";

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "uint256", "name": "_targetAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "_durationInDays", "type": "uint256" }
    ],
    "name": "createGoal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_goalId", "type": "uint256" }],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getUserGoals",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "uint256", "name": "targetAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "currentAmount", "type": "uint256" },
          { "internalType": "uint256", "name": "deadline", "type": "uint256" },
          { "internalType": "bool", "name": "isActive", "type": "bool" },
          { "internalType": "uint256", "name": "createdAt", "type": "uint256" }
        ],
        "internalType": "struct CeloSaver.SavingsGoal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

function App() {
  const { address } = useAccount();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [days, setDays] = useState('');

  const { write: createGoal } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'createGoal',
  });

  const { data: goals } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'getUserGoals',
    args: [address],
    enabled: !!address,
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">CeloSaver</h1>
        
        <div className="flex justify-center mb-6">
          <ConnectButton />
        </div>

        {address ? (
          <>
            <div className="space-y-4 mb-8">
              <input
                placeholder="Goal name (e.g. Buy Laptop)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                placeholder="Target amount (CELO-S)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="number"
                step="0.01"
              />
              <input
                placeholder="Duration (days)"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="number"
              />
              <button
                onClick={() => {
                  if (name && target && days) {
                    createGoal({ args: [name, ethers.parseEther(target), Number(days)] });
                    setName('');
                    setTarget('');
                    setDays('');
                  }
                }}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Goal
              </button>
            </div>

            <div className="space-y-4">
              {goals && goals.length > 0 ? (
                goals.map((goal: any, index: number) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg bg-indigo-50">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{goal.name}</h3>
                      <span className={`text-sm font-medium ${goal.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {goal.isActive ? 'Active' : 'Done'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {ethers.formatEther(goal.currentAmount)} / {ethers.formatEther(goal.targetAmount)} CELO-S
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((Number(goal.currentAmount) * 100) / Number(goal.targetAmount), 100)}%`
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 italic">No goals yet. Create your first!</p>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 mt-8">
            <p className="mb-4">Connect your wallet to start saving!</p>
            <p className="text-xs">Make sure you're on <strong>Celo Sepolia Testnet</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;