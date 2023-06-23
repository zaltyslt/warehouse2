import React, {useEffect, useState} from 'react'
import {Form, Button, Icon, Grid, Segment, Container, Select, Table, Input, TextArea} from 'semantic-ui-react'
import {authApi} from "../misc/AuthApi";
import {handleLogError} from "../misc/Helpers";
import {publicApi} from "../misc/PublicApi";



export function PublicOrderPage({refresh}) {

    const freshOrder = {id: null, clientName: '', description: '', confirmed: undefined, positions: [],}
    const [menus, setMenus] = useState([]);
    const [menuToShow, setMenuToShow] = useState(undefined);
    const [positionsToShow, setPositionsToShow] = useState([]);
    const [order, setOrder] = useState(freshOrder);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        handleGetMenus();

    }, []);
    const handleGetMenus = () => {
        return publicApi.getMenus()
            .then(response => {
                setMenus(response.data);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                // setIsMenusLoading(false);
            })
    }


    const inputChange = (e, {name, value}) => {
           setOrder((prevState) => ({...prevState, [name]: value,}));
    }

    function handleOrderChange(e, {name, value}) {
        // console.log(name + ' ' + value);

        let updatedPositions;

        if (name === 'add') {
            const tempPosition = positionsToShow.find(position => position.id === value);
            // console.log(tempPosition);

            if (tempPosition.quantity !== 0) {
                const index = order.positions.findIndex(position => position.id === value)
                // console.log(index);
                if (index === -1) {
                    updatedPositions = [...order.positions, tempPosition];
                } else {
                    // console.log(order.positions);
                    updatedPositions = order.positions.map(position => {
                        if (position.id === tempPosition.id) {
                            // console.log(position);
                            // return {...position, quantity: Number(value)};
                            return tempPosition;
                        }
                        return position;
                    });
                }
                // console.log(updatedPositions);
                setOrder(prevState => ({...prevState, positions: updatedPositions}));
            }
        } else if (name === 'remove') {
            updatedPositions = order.positions.filter((position) => position.id !== value);
            setOrder(prevState => ({...prevState, positions: updatedPositions}));
        } else {
            updatedPositions =
                positionsToShow.map(position => {
                    if (position.id === name) {
                        return {...position, quantity: Number(value)};
                    }
                    return position;
                });
            // console.log(updatedPositions);
            setPositionsToShow(updatedPositions);
        }
    }

    function handleChosenMenu(e, data) {
        console.log(data.value);
        const menuIndex = menus.find(menu => menu.title === data.value.title);
        console.log(menuIndex);
        const positions = menuIndex.positions.map((position) => ({...position, quantity: 0}));
        console.log(positions);
        setMenuToShow(menuIndex);
        setPositionsToShow(positions);
    }

    const handleModalClose = () => {
        setModalOpen(false);
        clearPage();
    }
    const handleCreateOrder = (e) => {

        publicApi.createOrder(order)
            .then(response => {
                console.log(response.data);
                setModalOpen(true);
            })
            .catch(error => {
                handleLogError(error)
            });
        // .finally(() => {
        //     // setIsMenusLoading(false);
        // })

    }
    const clearPage = () => {
        setOrder(freshOrder);
        setMenuToShow(undefined);
        setPositionsToShow([]);
        refresh();
    }

    return (
        <Container text>


            <Grid stackable columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Segment color='violet'>

                            {/*<TitleInputForm*/}

                            {/*    order={order}*/}
                            {/*    // showInfo={showInfo}*/}
                            {/*    inputChange={inputChange}*/}
                            {/*    handleCreateOrder={handleCreateOrder}*/}
                            {/*/>*/}


                            <Form>
                                <Form.TextArea
                                    name='description'
                                    rows={1}
                                    placeholder={'Enter order description ...'}
                                    onChange={inputChange}
                                />
                                <Form.Select
                                    options={
                                        menus.map((menu, index) => ({key: index, value: menu, text: menu.title,}))
                                    }
                                    placeholder='Select menu'
                                    value={menuToShow}
                                    onChange={handleChosenMenu}
                                />
                            </Form>


                            {/*{modalOpen && <ModalSimple open={modalOpen}*/}
                            {/*                           onClose={handleModalClose}*/}
                            {/*/>}*/}
                            <Table compact striped selectable>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={1}>Nr</Table.HeaderCell>
                                        <Table.HeaderCell width={3}>Title</Table.HeaderCell>
                                        <Table.HeaderCell width={4}>Description</Table.HeaderCell>
                                        <Table.HeaderCell width={1}>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell width={1}>Action</Table.HeaderCell>

                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        (positionsToShow === undefined || positionsToShow.length === 0) ? (

                                            <Table.Row key='no-dishes'>
                                                <Table.Cell collapsing textAlign='center' colSpan='5'>No
                                                    Dishes</Table.Cell>
                                            </Table.Row>
                                        ) : (
                                            positionsToShow.map((position, index) => {
                                                return (
                                                    <Table.Row key={index}>
                                                        {/*<Table.Cell>{'Menu'}</Table.Cell>*/}
                                                        <Table.Cell>{index + 1}</Table.Cell>
                                                        <Table.Cell>{position.dish.title}</Table.Cell>
                                                        <Table.Cell>{position.dish.description}</Table.Cell>
                                                        <Table.Cell>
                                                            <Input style={{width: '60px'}}
                                                                   name={position.id}
                                                                // placeholder='SQuantity'
                                                                   value={position.quantity}
                                                                   onChange={handleOrderChange}
                                                            />
                                                            {/*{position.quantity}*/}
                                                        </Table.Cell>
                                                        <Table.Cell collapsing>
                                                            <Button
                                                                circular
                                                                color='green'
                                                                size='small'
                                                                icon='plus'
                                                                onClick={(event, data) =>
                                                                    handleOrderChange(event, {
                                                                        name: 'add',
                                                                        value: position.id
                                                                    })}
                                                                // onClick={() => handleDeleteOrder(order.id)}
                                                            />
                                                        </Table.Cell>
                                                    </Table.Row>
                                                )
                                            }))}
                                </Table.Body>
                            </Table>
                            <p>{order.positions.length > 0 && 'To be ordered:'}</p>
                            <Table compact striped selectable>
                                <Table.Body>
                                    {order.positions.map((position, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                {/*<Table.Cell>{'Menu'}</Table.Cell>*/}
                                                <Table.Cell width={1}>{index + 1}</Table.Cell>
                                                <Table.Cell width={3}>{position.dish.title}</Table.Cell>
                                                <Table.Cell width={4}>{position.dish.description}</Table.Cell>
                                                <Table.Cell width={1}>{position.quantity}</Table.Cell>
                                                <Table.Cell width={1}>
                                                    <Button
                                                        circular
                                                        color='red'
                                                        size='small'
                                                        icon='minus'
                                                        onClick={(event, data) =>
                                                            handleOrderChange(event, {
                                                                name: 'remove',
                                                                value: position.id
                                                            })}
                                                    />
                                                </Table.Cell>
                                            </Table.Row>)
                                    })}
                                </Table.Body>
                            </Table>
                        </Segment>
                        {/*<p style={{textAlign: 'left'}}>Menu to*/}
                        {/*    show: {menuToShow === undefined ? '*undefined' : menuToShow.title}</p>*/}

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

