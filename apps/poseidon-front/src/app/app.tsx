import { useLocalState, useRequest } from '@oneforx/poseidon';
import { useEffect } from 'react';

export function App() {
  const [ test, setTest ] = useLocalState("test", "ddzazdddzadaza");
  const [ code, post ] = useRequest("https://flagcdn.com/en/codes.json", null, true)
  const [ dataTest, postTest ] = useRequest("https://api.publicapis.org/entries", null, true)

  useEffect(() => { console.log(code.data)}, [code.data])
  useEffect(() => { console.log(dataTest.data)}, [dataTest.data])
  
  return (
    <div>
      {test}
      <button onClick={() => setTest("dzadza") }>Change test</button>
    </div>
  );
}

export default App;
