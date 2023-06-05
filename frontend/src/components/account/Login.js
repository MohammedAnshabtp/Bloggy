import React, { useContext, useEffect, useState } from "react";
import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
    width: 400px;
    margin: 55px auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 /0.6);
`;
const Image = styled("img")({
    width: 100,
    display: "flex",
    margin: "auto",
    padding: "30px 5px",
});

const Wrapper = styled(Box)`
    padding: 45px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div,
    & > button,
    & > p {
        margin-top: 30px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 58px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: "",
    password: "",
};

const signupInitialValues = {
    name: "",
    username: "",
    password: "",
};

const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState("");
    const [account, toggleAccount] = useState("login");

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        try {
            let response = await API.userLogin(login);
            console.log("LALAL", response);
            if (response.isSuccess) {
                showError("");
                sessionStorage.setItem(
                    "accessToken",
                    `Bearer ${response.data.accessToken}`
                );
                sessionStorage.setItem(
                    "refreshToken",
                    `Bearer ${response.data.refreshToken}`
                );
                setAccount({
                    name: response.data.name,
                    username: response.data.username,
                });

                isUserAuthenticated(true);
                setLogin(loginInitialValues);
                navigate("/");
            } else {
                showError("Something went wrong! Please try again later.");
            }
        } catch (error) {
            console.error(error);
            showError("An error occurred. Please try again later.");
        }
    };

    const signupUser = async () => {
        try {
            let response = await API.userSignup(signup);
            if (response.isSuccess) {
                showError("");
                setSignup(signupInitialValues);
                toggleAccount("login");
            } else {
                showError("Something went wrong! Please try again later.");
            }
        } catch (error) {
            // Handle any errors that occurred during the API call
            console.error(error);
            showError("An error occurred. Please try again later.");
        }
    };
    const toggleSignup = () => {
        account === "signup" ? toggleAccount("login") : toggleAccount("signup");
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {account === "login" ? (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            value={login.username}
                            onChange={(e) => onValueChange(e)}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            value={login.password}
                            onChange={(e) => onValueChange(e)}
                            name="password"
                            label="Enter Password"
                        />

                        {error && <Error>{error}</Error>}

                        <LoginButton
                            variant="contained"
                            onClick={() => loginUser()}
                        >
                            Login
                        </LoginButton>
                        <Text style={{ textAlign: "center" }}>OR</Text>
                        <SignupButton
                            onClick={() => toggleSignup()}
                            style={{ marginBottom: 50 }}
                        >
                            Create an account
                        </SignupButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            name="name"
                            label="Enter Name"
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            name="username"
                            label="Enter Username"
                        />
                        <TextField
                            variant="standard"
                            onChange={(e) => onInputChange(e)}
                            name="password"
                            label="Enter Password"
                        />
                        {error && <Typography>{error}</Typography>}
                        <SignupButton onClick={() => signupUser()}>
                            Signup
                        </SignupButton>
                        <Text style={{ textAlign: "center" }}>OR</Text>
                        <LoginButton
                            variant="contained"
                            onClick={() => toggleSignup()}
                        >
                            Already have an account
                        </LoginButton>
                    </Wrapper>
                )}
            </Box>
        </Component>
    );
};

export default Login;
