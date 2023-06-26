import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Grid, Input, Segment, Table,} from 'semantic-ui-react';
import {publicApi} from "../misc/PublicApi";
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";

export function Reports() {
    const [clientsTopByItems, setClientsTopByItems] = useState([]);
    const [clientsTopByWeight, setClientsTopByWeight] = useState([]);


    useEffect(() => {
        getTopByQuantity();
        getTopByWeight();

    }, []);

    const getTopByQuantity = () => {
        publicApi.getClientsTopByQuantity()
            .then(response => {
                setClientsTopByItems(response.data);
                console.log(response.data);

            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {

            })
    }
    const getTopByWeight = () => {
        publicApi.getClientsTopByWeight()
            .then(response => {
                setClientsTopByWeight(response.data);
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
    let clientListByItems;
    if (clientsTopByItems.length === 0) {
        clientListByItems = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        );
    } else {
        clientListByItems = clientsTopByItems.map(client => {
            return (
                <Table.Row key={client.id}>
                    <Table.Cell>{client.id}</Table.Cell>
                    <Table.Cell>{client.name}</Table.Cell>
                    <Table.Cell>{client.itemsCount}</Table.Cell>

                    <Table.Cell collapsing>

                        {/*<Button*/}
                        {/*    as={Link} to={`/clientview/${client.id}`} primary*/}
                        {/*    circular*/}
                        {/*    color='red'*/}
                        {/*    size='small'*/}
                        {/*    icon='eye'*/}

                        {/*    // onClick={() => handleDeleteUser(user.username)}*/}
                        {/*/>*/}
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    let clientListByWeight;
    if (clientsTopByWeight.length === 0) {
        clientListByWeight = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No items</Table.Cell>
            </Table.Row>
        );
    } else {
        clientListByWeight = clientsTopByWeight.map(client1 => {
            return (
                <Table.Row key={client1.id}>
                    <Table.Cell>{client1.id}</Table.Cell>
                    <Table.Cell>{client1.name}</Table.Cell>
                    <Table.Cell>{client1.itemsWeight}</Table.Cell>

                    <Table.Cell collapsing>

                        {/*<Button*/}
                        {/*    as={Link} to={`/clientview/${client.id}`} primary*/}
                        {/*    circular*/}
                        {/*    color='red'*/}
                        {/*    size='small'*/}
                        {/*    icon='eye'*/}

                        {/*    // onClick={() => handleDeleteUser(user.username)}*/}
                        {/*/>*/}
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <h3 align={'center'}>This is reports page.</h3>
            <Grid stackable columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Segment color='violet'>
                            <h3>Top 5 clients by registered items</h3>
                            <Table>
                                <Table.Header>
                                    <Table.Row textAlign={'center'}>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                                        <Table.HeaderCell width={7}>Client</Table.HeaderCell>
                                        <Table.HeaderCell width={7}>Inventory count</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {clientListByItems}
                                </Table.Body>
                            </Table>
                        </Segment>

                        <Segment color='violet'>
                            <h3>Top 5 clients by registered items weight</h3>
                            <Table>
                                <Table.Header>
                                    <Table.Row textAlign={'center'}>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.HeaderCell width={2}>ID</Table.HeaderCell>
                                        <Table.HeaderCell width={7}>Client</Table.HeaderCell>
                                        <Table.HeaderCell width={7}>Inventory weight</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {clientListByWeight}
                                </Table.Body>
                            </Table>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </>
    );
}