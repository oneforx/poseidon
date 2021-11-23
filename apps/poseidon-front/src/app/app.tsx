import { useLocalState } from '@oneforx/poseidon';

export function App() {
  const [ test, setTest ] = useLocalState("test", true);
  return (
    <div>
    </div>
  );
}

export default App;
