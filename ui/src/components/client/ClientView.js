import React, {useEffect, useState} from 'react';
import {Form, Button, Input, Table, Container, Radio, Icon, TableHeaderCell} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {publicApi} from "../misc/PublicApi";
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";
import {Link, useParams} from "react-router-dom";


export function ClientView() {

    const [clientLocal, setClientLocal] = useState();
    // const [error, setError] = useState({});
    // const [message, setMessage] = useState(undefined);
    //
    const params = useParams();
    useEffect(() => {
        getClient(params.id);

    }, []);

    const getClient = (id) => {
        publicApi.getClients(id)
            .then(response => {
                console.log(response.data);
                setClientLocal(response.data[0]);
                // setMessage('Client created successfully!')
            })
            .catch(error => {
                handleLogError(error);
                // setMessage(error.message);
            })
            .finally(() => {

            });
    }

    let clientDetails;

    if (clientLocal === undefined) {
        console.log(clientLocal);
        clientDetails = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No data</Table.Cell>
            </Table.Row>
        );
    } else {
        console.log(clientLocal);
        clientDetails = (
            <Table.Row>
                <Table.Cell>{clientLocal && clientLocal.id}</Table.Cell>
                <Table.Cell>{`${clientLocal.name} ${clientLocal.surname}`}</Table.Cell>
                <Table.Cell>{clientLocal.birthday}</Table.Cell>
                <Table.Cell>{clientLocal.phone}</Table.Cell>
                <Table.Cell>{clientLocal.loyalty ? 'Loyal' : 'Casual'}</Table.Cell>
            </Table.Row>
        )
    }

    let inventory;

    function itemTrash(e,{id}) {
        publicApi.trashItem(id)
            .then(response => {
                console.log(response.data);
                getClient(params.id);
                // setMessage('Client created successfully!')
            })
            .catch(error => {
                handleLogError(error);
                // setMessage(error.message);
            })
            .finally(() => {

            });
    }

    if (clientLocal === undefined || clientLocal.items === undefined || clientLocal.items.length === 0) {
        console.log(clientLocal);
        inventory = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No items</Table.Cell>
            </Table.Row>
        );
    } else {
        console.log(clientLocal);
        inventory = clientLocal.items.map((item, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.title}</Table.Cell>
                        <Table.Cell>{item.weight}</Table.Cell>
                        <Table.Cell>{item.location}</Table.Cell>
                        <Table.Cell>{item.dropDate}</Table.Cell>
                        <Table.Cell>
                            <Button
                                onClick={itemTrash}
                                circular
                                color='red'
                                size='small'
                                icon='trash'
                                id={item.id}


                                // onClick={() => handleDeleteUser(user.username)}
                            />
                        </Table.Cell>

                    </Table.Row>)
            }
        )
    }
    const handleInputChange = (e, {name, value}) => {
        console.log(clientLocal);
        console.log(`name: ${name} value: ${value}`);
        const tempClient = {...clientLocal, [name]: value}
        console.log(tempClient);
        // setClientLocal(tempClient);
    }

    return (
        <>
            <Container>

                <p>Client view</p>
                <Table compact striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Client</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Birth date</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Telephone</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Loyalty</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {clientDetails}
                    </Table.Body>
                </Table>
                <Button
                    as={Link} to={`/itemcreate/${params.id}`} primary

                    circular
                    color='red'
                    size='small'
                    // icon='eye'
                    label={'Add item'}

                    // onClick={() => handleDeleteUser(user.username)}
                />
                {<Table>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Id</Table.HeaderCell>
                            <Table.HeaderCell width={1}>Title</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Weight</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Location</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Drop date</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Action</Table.HeaderCell>

                        </Table.Row>

                    </Table.Header>
                    <Table.Body>
                        {inventory}
                    </Table.Body>
                </Table>
                }

            </Container>
        </>
    );
}