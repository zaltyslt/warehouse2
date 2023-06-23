import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import {AuthContext} from '../context/AuthContext'
import {authApi} from '../misc/AuthApi'
import {AdminTab} from './AdminTab'
import {handleLogError} from '../misc/Helpers'


export function AdminPage() {
    // static contextType = AuthContext
    const Auth = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderDescription, setOrderDescription] = useState('');
    const [orderTextSearch, setOrderTextSearch] = useState('');
    const [usernameSearch, setUserNameSearch] = useState('');
    const [isAdmin, setIsAdmin] = useState(true);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [isOrdersLoading, setIsOrdersLoading] = useState(false);
    const [isOrderEdited, setIsOrderEdited] = useState(false);
    const [orderToEdit, setOrderToEdit] = useState(undefined);

    const [messageText, setMessageText] = useState(undefined);


    useEffect(() => {
        const user = Auth.getUser();
        const isAdmin = user.data.rol[0] === 'ADMIN';
        setIsAdmin(isAdmin);

        handleGetUsers();
        handleGetOrders();

    }, [Auth]);


    const handleInputChange = (e
                               , {name, value}
    ) => {
        console.log(name + ' ' + value);
        if (name === 'usernameSearch') {
            setUserNameSearch(value);
        } else if (name === 'orderTextSearch') {
            setOrderTextSearch(value);
        } else if (name === 'orderDescription') {
            setOrderDescription(value);
        }
    }


    const handleGetUsers = () => {

        const user = Auth.getUser();

        setIsUsersLoading(true);
        authApi.getUsers(user)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                handleLogError(error);
            })
            .finally(() => {
                setIsUsersLoading(false);
            })
    }



    const handleDeleteUser = (username) => {
        // const Auth = this.context
        const user = Auth.getUser()

        authApi.deleteUser(user, username)
            .then(() => {
                handleGetUsers();
            })
            .catch(error => {
                handleLogError(error);
            })
    }

    const handleSearchUser = () => {
        const user = Auth.getUser();

        const username = usernameSearch;
        authApi.getUsers(user, username)
            .then(response => {
                const data = response.data;
                const users = data instanceof Array ? data : [data];
                setUsers(users);
            })
            .catch(error => {
                handleLogError(error)
                setUsers([]);
            })
    }

    const handleGetOrders = () => {

        const user = Auth.getUser()

        setIsOrdersLoading(true);
        authApi.getOrders(user)
            .then(response => {
                console.log(response.data);
                setOrders(response.data)
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsOrdersLoading(false);
            })
    }
//oorder
    const handleEditOrder = (order) => {
        console.log(order);
       if(order === undefined && isOrderEdited){
          console.log('bac');
           setOrderToEdit(undefined);
       }

        if (!isOrderEdited) {
            setOrderToEdit(order);
        } else {
            setOrderToEdit(undefined);
        }
        setIsOrderEdited(!isOrderEdited);
    }
    const handleUpdateOrder = (order) => {
        console.log(order);
        const user = Auth.getUser()
        setIsOrdersLoading(true);
        authApi.updateOrder(user, order)
            .then(response => {
                console.log(response.data);

                // setOrders(response.data)
                handleGetOrders();
                setIsOrderEdited(false);
            })
            .catch(error => {
                handleLogError(error)
            })
            .finally(() => {
                setIsOrdersLoading(false);
            })
    }
    const handleDeleteOrder = (isbn) => {

        const user = Auth.getUser()

        console.log(isbn);

        authApi.deleteOrder(user, isbn)
            .then(() => {
                handleGetOrders()
            })
            .catch(error => {
                handleLogError(error)
            })
    }

    const handleCreateOrder = () => {
        const user = Auth.getUser();
        console.log(user.data.name);
        // let { orderDescription } = this.state
        let orderDescriptionLocal = orderDescription.trim()
        if (!orderDescriptionLocal) {
            return;
        }
        // private String description;
        // private String userName;
        // private List<Position> positions;
        const order = {
            clientName: user.data.name,
            description: orderDescription,
        };

        authApi.createOrder(user, order)
            .then(() => {
                handleGetOrders();
                setOrderDescription('');
            })
            .catch(error => {
                handleLogError(error);
            })
    }

    const handleSearchOrder = () => {

        const user = Auth.getUser();

        const text = orderTextSearch;
        authApi.getOrders(user, text)
            .then(response => {
                const orders = response.data;
                setOrders(orders);
            })
            .catch(error => {
                handleLogError(error);
                setOrders([]);
            })
    }



    if (!isAdmin) {
        return <Navigate to='/'/>
    } else {

        return (
            <Container>
                <AdminTab
                    isUsersLoading={isUsersLoading}
                    users={users}
                    usernameSearch={usernameSearch}
                    handleDeleteUser={handleDeleteUser}
                    handleSearchUser={handleSearchUser}

                    isOrdersLoading={isOrdersLoading}
                    orders={orders}
                    orderDescription={orderDescription}
                    orderTextSearch={orderTextSearch}
                    handleCreateOrder={handleCreateOrder}
                    handleEditOrder={handleEditOrder}
                    orderToEdit={orderToEdit}
                    handleUpdateOrder={handleUpdateOrder}
                    handleDeleteOrder={handleDeleteOrder}
                    handleSearchOrder={handleSearchOrder}
                    handleInputChange={handleInputChange}
                    isOrderEdited={isOrderEdited}

                />
            </Container>
        );
    }

}

