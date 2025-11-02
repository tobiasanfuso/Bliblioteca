
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import ToggleTheme from "../../ui/toggleTheme/ToggleTheme";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { loginUser } from "./Login.services";
import { errorToast } from "../../../utils/notification";
import AuthContainer from "../authContainer/AuthContainer";
import { useTranslate } from "../../../hooks/useTranslate/useTranslate";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { handleUserLogin } = useContext(AuthContext)

    const navigate = useNavigate();
    const translate = useTranslate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false
        }))
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.length) {
            alert("¡El email está vacío!");
            emailRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                email: true,
            }))
            return;
        }

        if (!passwordRef.current.value.length) {
            alert("¡El password esta vacío!");
            passwordRef.current.focus();
            setErrors(prevErrors => ({
                ...prevErrors,
                password: true,
            }))
            return;
        }

        loginUser({ email, password },
            (token) => {
                handleUserLogin(token);
                navigate('/library')
            },
            err => {
                errorToast(err.message)
            }

        )

    }

    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <AuthContainer>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                    <Form.Control
                        type="text"
                        className={
                            `input-email  ${errors.email ? 'border border-danger' : ''}`
                        }
                        placeholder="Ingresar email"
                        onChange={handleEmailChange}
                        value={email}
                        ref={emailRef}
                    />
                    {errors.email && <p className="text-danger">El campo email es obligatorio</p>}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        type="password"

                        placeholder="Ingresar contraseña"
                        onChange={handlePasswordChange}
                        value={password}
                        ref={passwordRef}
                    />
                </FormGroup>
                <Row>
                    <Col />
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <p className="text-center fw-bold">{translate("login_no_account")}</p>
                    <Button onClick={handleRegisterClick}>Registrarse</Button>
                </Row>

            </Form>
        </AuthContainer>
    );
};


export default Login;
