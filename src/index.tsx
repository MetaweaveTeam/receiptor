import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProofOfReceipt from './Screens/ProofOfReceipt';
import { NextUIProvider } from '@nextui-org/react';
import { Web3Modal } from '@web3modal/react';
import StartScreen from './Screens/Init';

const router = createBrowserRouter([
  {
    path: "/",
    element: <a href="/hash">simulate deployed environment</a>
  },
  {
    path: "/:hash/",
    element: <StartScreen />,
  },
  {
    path: "/:hash/:ar_txid",
    element: <ProofOfReceipt />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
      <Web3Modal config={{
        projectId: '4ed71622843b3aafe44e75d761da078d',
        theme: 'dark',
        accentColor: 'blue',
        ethereum: {
          appName: 'web3Modal'
        }
      }} />
    </NextUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
