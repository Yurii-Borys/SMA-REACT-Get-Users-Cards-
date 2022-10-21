
const Nabar = () => {
    return (
        <div className="container d-flex justify-content-between mb-2">
            <div className="">
                <img className="width_100" src="/images/logo.svg" alt="testTask" style={{height:"26px", width:"100px"}}></img>
            </div>
            <div>
                <button className="rounded width_100 border-0 button_bg_yellow me-3 font-size_16">
                    <a
                        className="text-decoration-none font-size_16 button_bg_yellow color_black"
                        style={{ color: "black" }}
                        href="#userSection"
                        aria-label="Users"
                        >
                        Users
                    </a>
                </button>
                <button className="rounded width_100 border-0 button_bg_yellow font-size_16">
                    <a
                        className="text-decoration-none font-size_16 button_bg_yellow color_black"
                        style={{ color: "black" }}
                        href="#formSection"
                        aria-label="Sign up"
                        >
                        Sign up
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Nabar;