import { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../contexts/AppContext';
import useLoader from './useLoader';

const useUserLoad = () => {
    const context = useContext(AppContext);
    const [isError, setIsError] = useState(false);
    const [requestMessage, setRequestMessage] = useState("");
    const { load } = useLoader();

    function sortUsers(users) {
        return users.sort((a, b) => b.registration_timestamp - a.registration_timestamp)
    }
    async function getUsers(count = 6) {
        await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${count}`)
            .then(res => {
                context.setUsers(sortUsers(res.data.users))
            })
            .catch((error) => {
                setIsError(true);
                if (error.response?.status === 404) {
                    console.log("Page not found.");
                    setRequestMessage("TPage not found.");
                    return;
                }
                if (error.response?.status === 422) {
                    console.log("Validation failed.");
                    setRequestMessage("Validation failed.");
                    return;
                }
                else {
                    console.log(error)
                    setIsError(true);
                    setRequestMessage(error.message);
                }
            })
    }
    async function getAllUsers() {
        let totalUsers = 0;
        await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users`)
            .then(res => totalUsers = res.data.total_users)
            .catch((error) => {
                setIsError(true);
                if (error.response?.status === 404) {
                    console.log("Page not found.");
                    setRequestMessage("TPage not found.");
                    return;
                }
                if (error.response?.status === 422) {
                    console.log("Validation failed.");
                    setRequestMessage("Validation failed.");
                    return;
                }
                else {
                    console.log(error)
                    setIsError(true);
                    setRequestMessage(error.message);
                }
            })
        load(() => getUsers(totalUsers))
    }

    return { sortUsers, getUsers, getAllUsers, isError, requestMessage };
};

export default useUserLoad;