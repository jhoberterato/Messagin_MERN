import { useContext } from "react"
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
const Register = () => {
    const {registerInfo, handleSetRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext)
    return (<>
        <Form onSubmit={registerUser}>
            <Row style={{
                height: "100vh",
                justifyContent: "center",
                paddingTop: "20%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h2>Register</h2>

                        <Form.Control type="text" placeholder="Name..." onChange={(e) => handleSetRegisterInfo({
                            ...registerInfo, name: e.target.value
                        })}/>
                        <Form.Control type="email" placeholder="Email..." onChange={(e) => handleSetRegisterInfo({
                            ...registerInfo, email: e.target.value
                        })}/>
                        <Form.Control type="password" placeholder="Password..." onChange={(e) => handleSetRegisterInfo({
                            ...registerInfo, password: e.target.value
                        })}/>
                        <Button variant="primary" type="submit">
                            {isRegisterLoading ? "Loding..." : "Register"}
                        </Button>
                        {
                            registerError?.error && (
                                <Alert variant="danger">
                                    <p>{registerError?.message}</p>
                                </Alert>
                            )
                        }
                        
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>)
}

export default Register
