import { NextUIProvider } from '@nextui-org/react';
import StartScreen from './Components/StartScreen';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Web3Modal } from '@web3modal/react';

export default function App() {
  library.add(fas);

  return (
    <NextUIProvider>
      <StartScreen />
      <Web3Modal config={{
        projectId: '4ed71622843b3aafe44e75d761da078d',
        theme: 'dark',
        accentColor: 'blue',
        ethereum: {
          appName: 'web3Modal'
        }
      }} />
    </NextUIProvider>
  );
}
