import React, {DependencyList, FC, useEffect, useRef} from 'react';

const useDidMountEffect = (func: () => void, deps: DependencyList): void => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;