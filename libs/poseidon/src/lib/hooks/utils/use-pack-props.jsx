import { useCallback, useMemo } from "react";

const usePackProps = ( originalProps, propList ) => {
    
    const packProps = useCallback( ( props ) => {
        const newProps = {};
        propList.forEach(
            ( prop ) => {
                newProps[ prop ] = props[ prop ];
            }
        );
        return newProps;
    }, [ propList ]);

    return useMemo(() => packProps(originalProps), [ originalProps, packProps ]);
};

export default usePackProps;