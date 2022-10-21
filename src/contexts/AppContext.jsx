import React from 'react';

const AppContext = React.createContext({
    loading: true,
    setLoading: _ => {},
    users: []
});

export default AppContext;