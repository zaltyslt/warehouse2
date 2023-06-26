import React, {useEffect, useState} from 'react';
import {Form, Button, Input, Table, Container, Radio, Icon, Message} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {publicApi} from "../misc/PublicApi";
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";
import {Link, useParams, useNavigate} from "react-router-dom";

export function ItemCreate() {
    const params = useParams();
    const navigate = useNavigate();



    const emptyItem = {
        id: null,
        title: '',
        weight: 0,
        location: '',
        dropDate: new Date(Date.now()),
        clientId: params.id,
    }

    const [item, setItem] = useState(emptyItem);
    const [error, setError] = useState({});
    const [message, setMessage] = useState(undefined);

    // useEffect(() => {
    //     // setClientLocal(emptyClient);
    //
    // }, []);

    const createItem = () => {
        publicApi.createItem(item)
            .then(response => {
                console.log(response.data);
                setMessage('Item created successfully!');
                navigate(`/clientview/${params.id}`);

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
        tempError = {...tempError, title: item.title === ''};
        tempError = {...tempError, weight: isNaN(item.weight)};
        tempError = {
            ...tempError,
            location: (isNaN(item.location) || item.location % 1 !== 0) || item.location < 1 || item.location > 40
        };
        // tempError = {...tempError, birthday: clientLocal.birthday === undefined};
        setError(tempError);

        if (!(tempError.title
            // || tempError.surname
            // || tempError.phone
            // || tempError.birthday
        )) {

            createItem();
        }
    }
    //
    // const handleSubmit = () => {
    //
    // }
    const handleInputChange = (e, {name, value}) => {
        console.log(item);
        console.log(`name: ${name} value: ${value}`);
        const tempItem = {...item, [name]: value}
        console.log(tempItem);
        setItem(tempItem);
    }

    return (
        <>
            <Container>

                <h3 align={'center'}>Add item</h3>

                <Form onSubmit={checkError}>
                    <Form.Group>
                        <Form.Input
                            label='Title'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'title'}
                            // value={clientLocal.name}
                            error={error.title}

                            placeholder="Enter title"
                        />

                        <Form.Input
                            label='Weight'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'weight'}
                            // value={clientLocal.surname}
                            error={error.weight}
                            placeholder="Enter weight"
                        />


                        <Form.Input
                            label='Location'
                            labelPosition={'left'}
                            onChange={handleInputChange}
                            name={'location'}
                            // value={clientLocal.phone}
                            error={error.location}
                            placeholder="Enter location (1..40)"
                        />


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