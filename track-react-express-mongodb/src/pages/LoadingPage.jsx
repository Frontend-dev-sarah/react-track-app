import React, { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../contexts/authContext';

const LoadingPage = () => {
    const { restoretoken } = useContext(AuthContext);
    useEffect(() => {
        restoretoken()
    }, []);
    return null;
};

export default LoadingPage;