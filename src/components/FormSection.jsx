import { useState } from "react";
import axios from "axios";
import useUserLoad from "../hooks/useUsersLoad";
import { validationName, validationEmail, validationPhoneNumber } from "../utylities/validationServise"

const POST_USER_URL = "https://frontend-test-assignment-api.abz.agency/api/v1/users";
const GET_USER_TOKEN = "https://frontend-test-assignment-api.abz.agency/api/v1/token";

const FormSection = () => {
    const { getUsers } = useUserLoad();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPosition, setUserPostion] = useState(1);
    const [userImage, setUserImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [isErrorNameMessage, setIsErrorNameMessage] = useState(false);
    const [isErrorEmailMessage, setIsErrorEmailMessage] = useState(false);
    const [isErrorPhoneMessage, setIsErrorPhoneMassage] = useState(false);
    const [isErrorImageUpload, setIsErrorImageUpload] = useState(false);
    const [isErrorImageUploadMessage, setІsErrorImageUploadMessage] = useState('');

    function validationUserName(value) {
        setUserName(value);
        validationName(value) ? setIsErrorNameMessage(false) : setIsErrorNameMessage(true);
    }
    function validationUserEmail(value) {
        setUserEmail(value);
        validationEmail(value) ? setIsErrorEmailMessage(false) : setIsErrorEmailMessage(true);
    }
    function validationUserPhone(value) {
        setUserPhone(value);
        validationPhoneNumber(value) ? setIsErrorPhoneMassage(false) : setIsErrorPhoneMassage(true);
    }
    function validationImage(value) {
        let image = value.target.files;
        let img = new Image();
        let imageMimeType = /image\/(jpg|jpeg)/i;
        if (image.length > 1) {
            setIsErrorImageUpload(true);
            setІsErrorImageUploadMessage("Please upload only one file");
            return;
        }
        if (!image[0].type.match(imageMimeType)) {
            setIsErrorImageUpload(true);
            setІsErrorImageUploadMessage("The file format must be jpeg or jpg")
            return;
        }
        if (typeof (image[0]) != "undefined") {
            let size = parseFloat(image[0].size / (1024 * 1024)).toFixed(2);
            img.src = window.URL.createObjectURL(image[0]);
            img.onload = () => {
                if (img.width < 70 && img.height < 70) {
                    setIsErrorImageUpload(true);
                    setІsErrorImageUploadMessage("Minimum size of photo 70x70px");
                    return;
                }
            }
            if (size > 5) {
                setIsErrorImageUpload(true);
                setІsErrorImageUploadMessage("Please select image size less than 5 MB");
                return;
            }
        }
        setUserImage(image[0]);
        setIsErrorImageUpload(false);
    }

    function handleSelectUserPosition(value) {
        setUserPostion(value);
    };

    async function getToken() {
        let userToken;
        await axios(GET_USER_TOKEN)
            .then((res) => {
                userToken = res.data.token;
            })
        return userToken;
    }

    async function createUserCard(formData) {
        const token = await getToken();
        const response = await axios.post(POST_USER_URL, formData, { headers: { 'Token': token } })
        return response;
    }

    function handleSubmitForm(e) {
        e.preventDefault();
        if (!userImage) {
            setIsErrorImageUpload(true);
            setІsErrorImageUploadMessage("Please upload file jpeg or jpg");
            return;
        }

        const formData = new FormData();
        formData.append('position_id', userPosition);
        formData.append('name', userName);
        formData.append('email', userEmail);
        formData.append('phone', userPhone);
        formData.append('photo', userImage);

        if (formData) {
            createUserCard(formData)
                .then(resp => {
                    setShowModal(true);
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        setShowModal(true);
                        console.log("The token expired.");
                    }
                    if (error.response?.status === 409) {
                        setShowModal(true);
                        console.log("User with this phone or email already exist");
                    }
                    if (error.response.status === 422) {
                        setShowModal(true);
                        console.log("Validation failed");
                    }
                    else {
                        setShowModal(true);
                        console.log(error)
                    }
                })
                .finally(() => {
                    setUserName('');
                    setUserEmail('');
                    setUserImage(null);
                    setUserPhone('');
                    setUserPostion(1);
                    getUsers();
                    setTimeout(() => setShowModal(false), 3000)
                })
        }
    }

    return (
        <section className="d-flex flex-column align-items-center">
            {!showModal && <>    <h1 id="formSection" className="font-size_40 color_black text-center">Working with POST request </h1>
                <form>
                    <div className="form-group d-flex flex-column">
                        <input
                            value={userName}
                            type="text"
                            className={`form__input border-radius_4 color_grey_700 font-size_16 ps-3 ${isErrorNameMessage ? "border-color_red" : "border-color_grey"}`}
                            placeholder="Your name"
                            onChange={(e) => validationUserName(e.target.value)}
                        />
                        {isErrorNameMessage && <span className="color_red font-size_12 ps-3">The name must contain from 2 to 60 characters</span>}
                        <input
                            value={userEmail}
                            type="email"
                            className={`form__input border-color_grey border-radius_4 color_grey_700 font-size_16 ps-3 ${isErrorEmailMessage ? "border-color_red" : "border-color_grey"}`}
                            placeholder="Email"
                            onChange={(e) => validationUserEmail(e.target.value)}
                        />
                        {isErrorEmailMessage && <span className="color_red font-size_12 ps-3">Please provide a valid email address</span>}
                        <input
                            value={userPhone}
                            type="phone"
                            className={`form__input border-color_grey border-radius_4 font-size_16 color_grey_700 ps-3 ${isErrorPhoneMessage ? "border-color_red" : "border-color_grey"}`}
                            id="exampleInputPhone" placeholder="Phone"
                            onChange={(e) => validationUserPhone(e.target.value)}
                        />
                        {!isErrorPhoneMessage && <label htmlFor="exampleInputPhone" className="font-size_12 color_grey_700 mt-1">+38 (XXX) XXX - XX - XX</label>}
                        {isErrorPhoneMessage && <label htmlFor="exampleInputPhone" className="font-size_12 color_red mt-1">Please provide a valid phone number +38XXXXXXXXXX</label>}
                        <label htmlFor="form-check" className="font-size_16 color_black" style={{ marginTop: "25px", marginBottom: "11px" }}>Select your position</label>
                        <div className="form-check ps-0" >
                            <input
                                className="form__check__input me-1"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="1"
                                defaultChecked={userPosition === 1}
                                onChange={(e) => handleSelectUserPosition(1)}
                            />
                            <label className="form-check-label font-size_16 color_black ps-5" htmlFor="exampleRadios1">Frontend developer</label>
                        </div>
                        <div className="form-check ps-0">
                            <input
                                className="form__check__input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value={userPosition === 2}
                                onChange={(e) => handleSelectUserPosition(2)}
                            />
                            <label className="form-check-label font-size_16 color_black ps-5 green" htmlFor="exampleRadios2">Backend developer</label>
                        </div>
                        <div className="form-check ps-0">
                            <input
                                className="form__check__input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios3"
                                value={userPosition === 3}
                                onChange={(e) => handleSelectUserPosition(3)}
                            />
                            <label className="form-check-labelv font-size_16 color_black ps-5" htmlFor="exampleRadios3"> Designer</label>
                        </div>
                        <div className="form-check ps-0">
                            <input
                                className="form__check__input me-1"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios4"
                                value={userPosition === 4}
                                onChange={(e) => handleSelectUserPosition(4)}
                            />
                            <label className="form-check-label font-size_16 color_black ps-5" htmlFor="exampleRadios4">QA</label>
                        </div>
                    </div>
                    <div className="bg_gray mt-3" style={{ width: "328px", height: "54px" }}>
                        <label className={`form-control d-flex h-100 p-0 ${isErrorImageUpload ? "is-invalid" : ""}`} style={{ backgroundColor: "#E5E5E5" }}>
                            <span
                                className="input-group-text h-100"
                                style={{ borderRadius: "4px 0px 0px 4px", width: "83px", backgroundColor: "#E5E5E5" }}
                                htmlFor="file-upload">
                                Upload
                            </span>
                            {userImage &&
                                <label
                                    htmlFor="exampleInputPhone"
                                    className="font-size_12 align-self-center color_grey_700 mt-1 px-3">
                                    File {userImage.name} uploaded
                                </label>}
                            <input
                                value={""}
                                type="file"
                                id="file-upload"
                                className="d-none"
                                placeholder="Upload your photo"
                                accept="image/jpg,image/jpeg"
                                onChange={(e) => validationImage(e)} />
                        </label>
                        {isErrorImageUpload && <span className="color_red font-size_12 ps-3">{isErrorImageUploadMessage}</span>}
                    </div>
                </form>
                <button
                    className="rounded width_100 border-0 button_bg_yellow font-size_16"
                    style={{ marginTop: "50px", marginBottom: "100px" }}
                    type="submit"
                    disabled={
                        !userEmail.length > 0 || !userPhone.length > 0 || !userName.length > 0 || isErrorNameMessage ||
                        isErrorEmailMessage || isErrorPhoneMessage || isErrorImageUpload
                    }
                    onClick={(e) => handleSubmitForm(e)}>
                    Sign up
                </button>
            </>
            }
            {showModal &&
                <div className="text-center mb-5 w-100 p-1"
                    style={{
                        background: "url(/images/success-image.svg)",
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: "auto",
                        backgroundPosition: "center bottom",
                        backgroundColor: "#ffffff",
                        height: "25rem"
                    }}>
                    <h1 className="font-size_40 bg_white">User successfully registered</h1>
                </div>
            }
        </section>
    )
}

export default FormSection;