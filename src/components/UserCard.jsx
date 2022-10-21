const UserCard = ({ user }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 bg_gray  text-center p-2" >
            <div className="bg_white border-radius_10 px-3" style={{ height: "254px" }}>
                <img
                    className="rounded-circle mt-3"
                    style={{ width: "70px", height: "70px" }}
                    src={user.photo ? user.photo : "/images/no-Name.png"} alt={user?.name}
                />
                <div className="font-size_16 p-3 bg_white">{user?.name}</div>
                <div className="bg_white">
                    <div className="font-size_16 bg_white">{user?.position}</div>
                    <div data-title={user?.email}> <div className="font-size_16 text-truncate bg_white" >{user?.email}</div></div>
                    <div className="font-size_16 bg_white">{user?.phone}</div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;