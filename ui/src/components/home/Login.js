import React, {Component, useContext, useEffect, useState} from 'react';
import {NavLink, Navigate} from 'react-router-dom';
import {Button, Form, Grid, Segment, Message} from 'semantic-ui-react';
import {AuthContext} from '../context/AuthContext';
import {authApi} from '../misc/AuthApi';
import {parseJwt, handleLogError} from '../misc/Helpers';
import {useNavigate} from 'react-router-dom';

export function Login() {

    const Auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);

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
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // const { username, password } = this.state
        console.log(username + ' ' + password);
        if (!(username && password)) {
            setIsError(true);
            return
        }

        authApi
            .authenticate(username, password)
            .then((response) => {
                console.log(response);
                const {accessToken} = response.data;
                const data = parseJwt(accessToken);
                const user = {data, accessToken};

                Auth.userLogin(user);

                setUsername('');
                setPassword('');
                setIsLoggedIn(true);
                setIsError(false);
                navigate(username === 'admin' ? '/adminpage' : '/userpage');
            })
            .catch((error) => {
                handleLogError(error);
                console.log(error);
                setIsError(true);
            });
    }


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
                        <Button color='violet' fluid size='large'>Login</Button>
                    </Segment>
                </Form>
                <Message>{`Don't have already an account? `}
                    <a href='/signup' color='violet' as={NavLink} to="/signup">Sign Up</a>
                </Message>
                {isError && <Message negative>The username or password provided are incorrect!</Message>}
            </Grid.Column>
        </Grid>
    );

}

