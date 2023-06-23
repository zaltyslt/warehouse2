import React from 'react';
import {Grid, Form, Button, Input, Icon, Table} from 'semantic-ui-react';
import {OrderForm} from '../misc/OrderForm';

import {format} from "date-fns";


export function OrderTable({
                               orders,
                               orderDescription,
                               orderTextSearch,
                               handleInputChange,
                               handleCreateOrder,
                               handleEditOrder,
                               handleDeleteOrder,
                               handleSearchOrder,
                               handleUpdateOrder,
                           }) {
    const undefinedIcon = <Icon loading name='spinner' color={'blue'}/>;
    const confirmedIcon = <Icon name='check' color={'green'}/>;
    const canceledIcon = <Icon name='dont' color={'red'}/>;


    let orderList;
    if (orders.length === 0) {
        orderList = (
            <Table.Row key='no-order'>
                <Table.Cell collapsing textAlign='center' colSpan='5'>No order</Table.Cell>
            </Table.Row>
        )
    } else {
        console.log(orders);
        orderList = orders.map(order => {
            return (
                <Table.Row
                    onClick={() => handleEditOrder(order)}
                    key={order.id}>
                    <Table.Cell>{format(new Date(order.createdAt), "yyyy MM dd HH:mm:ss")}</Table.Cell>
                    <Table.Cell>{order.user.username}</Table.Cell>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell >{
                        order.confirmed === undefined ? undefinedIcon
                            : (order.confirmed ? confirmedIcon : canceledIcon)
                    }
                    </Table.Cell>
                    <Table.Cell>{order.description}</Table.Cell>
                    <Table.Cell>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            onClick={() => handleDeleteOrder(order.id)}
                        />
                    </Table.Cell>
                    {/*<Table.Cell><Input style={{ width: "50px" }}>*/}

                    {/*</Input></Table.Cell>*/}

                </Table.Row>
            )
        })
    }

    return (
        <>
            <Grid stackable divided>
                <Grid.Row columns='2'>
                    <Grid.Column width='6'>
                        <Form onSubmit={handleSearchOrder}>
                            <Input
                                action={{icon: 'search'}}
                                name='orderTextSearch'
                                placeholder='Search by Id or Description'
                                value={orderTextSearch}
                                onChange={handleInputChange}
                            />
                        </Form>

                    </Grid.Column>
                    <Grid.Column>
                        <OrderForm
                            orderDescription={orderDescription}
                            handleInputChange={handleInputChange}
                            handleCreateOrder={handleCreateOrder}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={3}>Created At</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Username</Table.HeaderCell>
                        <Table.HeaderCell width={3}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={1}/>

                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {orderList}
                </Table.Body>
            </Table>
            {/*<Button*/}
            {/*    circular*/}
            {/*    color='yellow'*/}
            {/*    size='small'*/}
            {/*    icon='send'*/}
            {/*    onClick={handleUpdateOrder}*/}
            {/*/>*/}
        </>
    );
}

