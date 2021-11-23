import { createContext, useContext, useState } from 'react'

const KartripInitialState = {
  user: {
    displayName: "Hermann Vincent",
    walletCount: "15€"
  }
}

const KartripContext = createContext(KartripInitialState);

const KartripContextProvider = ({ children }) => {
  const [ user, setUser ] = useState(KartripInitialState.user);


  return <KartripContext.Provider value={{
    user,
    setUser
  }}>{children}</KartripContext.Provider>
}


export const useUser = () => {
  const { user } = useContext(KartripContext);
  return { ...user };
}

export default { KartripContextProvider, KartripContext }