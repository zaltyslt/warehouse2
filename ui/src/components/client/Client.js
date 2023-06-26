import React, {useEffect, useState} from 'react';
import {Form, Button, Input, Table, Container, Radio, Icon} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {publicApi} from "../misc/PublicApi";
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";

export function Client(props) {
    const {mode, client,} = props;


    const emptyClient = {
        name: '',
        surname: '',
        phone: '',
        birthday: undefined,
        loyalty: 'false',
    }

    const [clientLocal, setClientLocal] = useState(emptyClient);
    const [error, setError] = useState({});
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        // setClientLocal(emptyClient);

    }, []);

    const createClient=()=>{
        publicApi.createClient(clientLocal)
            .then(response => {
                console.log(response.data);
                setMessage('Client created successfully!')
            })
            .catch(error => {
                handleLogError(error);
                setMessage(error.message);
            })
            .finally(() => {

            })
    }

    const checkError = () => {
        let tempError;
        tempError = {...tempError, name: clientLocal.name === ''};
        tempError = {...tempError, surname: clientLocal.surname === ''};
        tempError = {...tempError, phone: clientLocal.phone === ''};
        tempError = {...tempError, birthday: clientLocal.birthday === undefined};
        setError(tempError);

        if(!(tempError.name || tempError.surname || tempError.phone || tempError.birthday)){

            createClient();
        }
    }

    const handleSubmit = () => {

    }
    const handleInputChange = (e, {name, value}) => {
        console.log(clientLocal);
        console.log(`name: ${name} value: ${value}`);
        const tempClient = {...clientLocal, [name]: value}
        console.log(tempClient);
        setClientLocal(tempClient);
    }

    return (
        <>
            <Container>
                {message && <p>message</p>}
                <p>{`Mode ${mode}`}</p>
                <p>{`Client name ${client.name}`}</p>

                <Form onSubmit={checkError}>
                    <Form.Group>
                        <Form.Input
                            label='Name'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'name'}
                            value={clientLocal.name}
                            error={error.name}
                            placeholder="Enter your name"
                        />

                        <Form.Input
                            label='Surname'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'surname'}
                            value={clientLocal.surname}
                            error={error.surname}
                            placeholder="Enter your surname"
                        />
                    </Form.Group>
                    <Form.Group>

                        <Form.Input
                            label='Phone'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'phone'}
                            value={clientLocal.phone}
                            error={error.phone}
                            placeholder="Enter your phone no"
                        />
                        <SemanticDatepicker
                            label='Birth date'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'birthday'}
                            error={error.birthday}
                            e
                            onChange={handleInputChange}
                        />
                        <Form.Field>
                            <b>{'Loyalty:'}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Casual'
                                name='loyalty'
                                value={'false'}
                                checked={clientLocal.loyalty === 'false'}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Loyal'
                                name='loyalty'
                                value={'true'}
                                checked={clientLocal.loyalty === 'true'}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button icon labelPosition='right'
                        // disabled={createBtnDisabled
                    >
                        Create<Icon name='add'/>
                    </Button>
                    {/*    </Form>*/}
                    {/*    */}
                    {/*    */}
                    {/*<Form onSubmit={undefined}>*/}
                    {/*    <Form.Field>*/}
                    {/*        <label>Name</label>*/}
                    {/*        <Input*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            name={'name'}*/}
                    {/*            value={clientLocal.name}*/}
                    {/*            placeholder="Enter your name" />*/}
                    {/*    </Form.Field>*/}


                    {/*<Input*/}
                    {/*   // label='Name'*/}
                    {/*    type='text' action*/}
                    {/*       name='usernameSearch'*/}
                    {/*       placeholder='Search by Username'*/}
                    {/*       // value={usernameSearch}*/}
                    {/*       // onChange={handleInputChange}*/}
                    {/*>*/}


                    {/*<Button circular*/}
                    {/*        color='green'*/}
                    {/*        size='small'*/}
                    {/*        icon='search'*/}
                    {/*        // onClick={handleSearchUser}*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    circular*/}
                    {/*    color='teal'*/}
                    {/*    size='small'*/}
                    {/*    icon={'recycle'}*/}
                    {/*    // onClick={resetSearch}*/}
                    {/*/>*/}
                    {/*</Input>*/}
                </Form>
            </Container>
        </>
    );
}