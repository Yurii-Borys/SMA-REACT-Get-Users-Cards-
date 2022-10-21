import { useEffect, useState, useContext } from "react";
import AppContext from "../contexts/AppContext";
import useUserLoad from "../hooks/useUsersLoad";
import useLoader from "../hooks/useLoader";
import UserCard from "./UserCard";

const UserRequestSection = () => {
    const { users } = useContext(AppContext);
    const [isButtonShowMore, setIsButtonShowMore] = useState(true);
    const { load } = useLoader();
    const { isError, getUsers, getAllUsers, requestMessage } = useUserLoad();

    function handleGetAllUsers() {
        getAllUsers();
        setIsButtonShowMore(false)
    }

    useEffect(() => {
        load(() => getUsers(6))
    }, []);

    return (
        <section className="request-section d-flex row align-content-center justify-content-center">
            <h1
                id="userSection"
                className="font-size_40 color_black text-center"
                style={{ marginBottom: "50px" }}>
                Working with GET request
            </h1>
            {isError && <div className="text-center">{requestMessage}</div>}
            {!isError && <>
                <div className="row user-cards align-content-center">
                    {users?.map(user => <UserCard key={user.id} user={user} />)}
                </div>
                <div className="d-flex justify-content-center">
                    {isButtonShowMore && <button
                        className="button_bg_yellow font-size_16 rounded border-0 width_120 py-1"
                        onClick={() => handleGetAllUsers()}>Show more</button>}
                </div>
            </>
            }
        </section>
    )
}

export default UserRequestSection;