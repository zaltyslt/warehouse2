import React, {useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import {Form, Button, Grid, Input, Segment, Table, } from 'semantic-ui-react';
import {publicApi} from "../misc/PublicApi";
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";

export function ClientList() {
    const [clients, setClients] = useState([]);


    useEffect(() => {
     getClients();  

    }, []);
    
    const getClients = ()=>{
        publicApi.getClients()
            .then(response => {
                setClients(response.data);
                console.log(response.data);

            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {

            })
    }
    
    // const resetSearch = () => {
    //     handleInputChange('', {name: 'usernameSearch', value: ''});
    //     handleSearchUser();
    //
    // }
    let clientList;
    if (clients.length === 0) {
        clientList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        );
    } else {
        clientList = clients.map(client => {
            return (
                <Table.Row key={client.id}>
                    <Table.Cell>{client.id}</Table.Cell>
                    <Table.Cell>{`${client.name} ${client.surname}`}</Table.Cell>
                    <Table.Cell>{client.birthday}</Table.Cell>
                    <Table.Cell>{client.items.length}</Table.Cell>
                    <Table.Cell>{
                        client.items.reduce((sum, item) => sum + item.weight, 0)
                    }
                    </Table.Cell>

                    <Table.Cell collapsing>

                        <Button
                            as={Link} to={`/clientview/${client.id}`} primary
                            circular
                            color='red'
                            size='small'
                            icon='eye'

                            // onClick={() => handleDeleteUser(user.username)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <h3 align={'center'}>This is client page.</h3>
            <Grid stackable columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Segment color='violet'>
                            <Button
                                as={Link} to="/clientcreate" primary
                                circular
                                color='blue'
                                size='small'
                                // icon='eye'

                                // onClick={() => handleDeleteUser(user.username)}
                            >New client</Button>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Client</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Birth date</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Inventory count</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Inventory weight</Table.HeaderCell>

                        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {clientList}
                </Table.Body>
            </Table>
        </>
    );
}