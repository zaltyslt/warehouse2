import React, {Component, useContext, useEffect, useState} from 'react'
import {NavLink, Navigate} from 'react-router-dom'
import {Button, Form, Grid, Segment, Message} from 'semantic-ui-react'
import {AuthContext} from '../context/AuthContext'
import {authApi} from '../misc/AuthApi'
import {parseJwt, handleLogError} from '../misc/Helpers'

export function Signup() {
    const Auth = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkLoggedIn = () => {
            const loggedIn = Auth.userIsAuthenticated();
            console.log(loggedIn);
            setIsLoggedIn(loggedIn);
        };

        checkLoggedIn();
    }, [Auth]);


    const handleInputChange = (e, {name, value}) => {
        if (name === 'username') {
            setUsername(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
        if (name === 'name') {
            setName(value);
        }
        if (name === 'email') {
            setEmail(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password && name && email)) {

            setIsError(true);
            setErrorMessage('Please, fill all fields!');
            return
        }

        const user = {username, password, name, email}
        authApi.signup(user)
            .then(response => {
                const {accessToken} = response.data
                const data = parseJwt(accessToken)
                const user = {data, accessToken}

                const Auth = this.context
                Auth.userLogin(user);

                setUsername('');
                setPassword('');
                setIsLoggedIn(true);
                setIsError(false);
                setErrorMessage('');

            })
            .catch(error => {
                    handleLogError(error);
                    if (error.response && error.response.data) {
                        const errorData = error.response.data;
                        let errorMessage = 'Invalid fields';
                        if (errorData.status === 409) {
                            setErrorMessage(errorData.message);
                        } else if (errorData.status === 400) {
                            setErrorMessage(errorData.errors[0].defaultMessage);
                        }
                        setIsError(true);
                        //  setErrorMessage
                    }
                }
            );
    }


    if (isLoggedIn) {
        return <Navigate to='/'/>
    } else {
        return (
            <Grid textAlign='center'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Form size='large' onSubmit={handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                autoFocus
                                name='username'
                                icon='user'
                                iconPosition='left'
                                placeholder='Username'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name='name'
                                icon='address card'
                                iconPosition='left'
                                placeholder='Name'
                                onChange={handleInputChange}
                            />
                            <Form.Input
                                fluid
                                name='email'
                                icon='at'
                                iconPosition='left'
                                placeholder='Email'
                                onChange={handleInputChange}
                            />
                            <Button color='violet' fluid size='large'>Signup</Button>
                        </Segment>
                    </Form>
                    <Message>{`Already have an account? `}
                        <a href='/login' color='violet' as={NavLink} to="/login">Login</a>
                    </Message>
                    {isError && <Message negative>{errorMessage}</Message>}
                </Grid.Column>
            </Grid>
        )
    }

}