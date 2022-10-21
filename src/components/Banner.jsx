const Banner = () => {
    return (
        <section
            className="text-center align-items-center bg_white main-banner mt-1"
            style={{ background: "url(/images/main-banner.webp)", backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}
        >
            <h1 className="color_white font-size_40 bg-transparent">Test assignment for front-end developer</h1>
            <p className="color_white font-size_16 bg-transparent">What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
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
        </section>
    )
}

export default Banner;