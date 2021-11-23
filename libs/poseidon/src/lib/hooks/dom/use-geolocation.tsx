import { useContext, useMemo } from "react";
import { AppContext } from "../../contexts";


export const useGeolocation = () => {
  const { geolocation } = useContext(AppContext);
  return useMemo(() => geolocation, [ geolocation ]);
}

export default useGeolocation;