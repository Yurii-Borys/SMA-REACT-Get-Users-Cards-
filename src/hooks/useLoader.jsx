import { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const useLoader = () => {
    const context = useContext(AppContext);

    const load = (action) => {
        context.setLoading(true);
        return action().finally(() => context.setLoading(false));
    }

    return { load };
};

export default useLoader;