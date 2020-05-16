import React from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, Alert } from 'reactstrap';
import { login } from '../services/auth.service';
import { withRouter } from 'react-router-dom';
function Login(props) {

    const [error, setError] = React.useState(null)
    const loginButtonHandler = () => {
        let credentials = {
            password: document.getElementById('password').value,
            email: document.getElementById('email').value
        }
        login(credentials).then(_ => {
            props.history.replace('/categories')
        }).catch(e => {
            setError(e.response.data.message);
        });
    }
    return (
        <Container fluid className={'h-100'}>
            <Row className={'h-100'}>
                <Col className={'align-self-center offset-md-4'} md={4}>
                    <Card className={'shadow'}>
                        <CardHeader>
                            <h5>Login</h5>
                        </CardHeader>
                        <CardBody>
                            {error != null &&
                                <Alert>{error}</Alert>
                            }
                            <Form>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type={'text'} bsSize={'sm'} placeholder={'Type Email Address'} id={'email'} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input type={'password'} bsSize={'sm'} placeholder={'Type Password'} id={'password'} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Button onClick={loginButtonHandler} block size={'sm'} color={'dark'}>Login</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Alert color={'primary'} className={'text-center'}>
                                        Dont Have An Account Signup
                                    </Alert>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default withRouter(Login);