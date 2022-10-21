import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import './loader.scss';

const Loader = () => {
    const context = useContext(AppContext);

    return (
        <>
            {context?.loading &&
                <div className="loader d-flex justify-content-center">
                    <div className="loader-icon"></div>
                </div>
            }
        </>
    );
}

export default Loader;