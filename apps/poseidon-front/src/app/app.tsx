import { useLocalState } from '@oneforx/poseidon';

export function App() {
  const [ test, setTest ] = useLocalState("test", "ddzazdddzadaza");
  return (
    <div>
      {test}
      <button onClick={() => setTest("dzadza") }>Change test</button>
    </div>
  );
}

export default App;
