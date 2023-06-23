import React, {useEffect, useState} from 'react';
import {Grid, Form, Button, Input, Table, Header, Segment} from 'semantic-ui-react';

// import {PositionsList} from "../misc/PositionsList";
import {format} from "date-fns";
// import {BackButton} from "../misc/BackButton";

export function EditOrderTable({orderToEdit, handleEditOrder, handleUpdateOrder}) {

    const processOrder = (value) => {
console.log(value);

handleUpdateOrder({...orderToEdit,confirmed:value,})
    }

    return (
        <>
            <Grid stackable divided>
                {/*<Segment>*/}
                {/*    /!*<Header as='h3' textAlign='center'>*FixME menu to edit {menuToEdit.title}</Header>*!/*/}
                {/*</Segment>*/}
                <Grid.Row columns='1'>

                    <Grid.Column>
                        <p>{`Created: ${format(new Date(orderToEdit.createdAt), "yyyy MM dd HH:mm:ss")} `}</p>
                        <p>{`Status: ${orderToEdit.confirmed || 'Not confirmed'}`}</p>
                        {/*<PositionsList*/}
                        {/*    positions={orderToEdit.positions}*/}
                        {/*    handleMenuChanges={{}}*/}
                        {/*    options={{quantityInput: true, action: false}}*/}
                        {/*/>*/}

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns='3'>
                    <Grid.Column width={'5'}>
                        {/*<BackButton*/}
                        {/*    handleGoBack={handleEditOrder}*/}
                        {/*/>*/}
                        {/*<Button*/}
                        {/*    circular*/}
                        {/*    color='blue'*/}
                        {/*    size='small'*/}
                        {/*    icon='arrow left'*/}
                        {/*    // onClick={}*/}
                        {/*    onClick={printInfo}*/}
                        {/*/>*/}
                    </Grid.Column>
                    <Grid.Column
                        width={'6'}
                        textAlign={"center"}>
                        <Button
                            circular
                            color='red'
                            size='small'
                            className="ui labeled icon button"
                            onClick={() => processOrder(false)}
                        >
                            <i className="undo icon"></i>
                            Cancel
                        </Button>
                        <Button
                            circular
                            color='green'
                            size='small'
                            className="ui labeled icon button"
                            onClick={() => processOrder(true)}
                        >
                            Confirm
                            <i className="redo icon"></i>
                        </Button>

                    </Grid.Column>
                    <Grid.Column width={'5'}></Grid.Column>
                </Grid.Row>

            </Grid>

        </>
    );
}

