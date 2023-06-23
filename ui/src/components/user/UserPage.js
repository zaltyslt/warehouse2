import React, {useContext, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import {OrderTable} from './OrderTable';
import {AuthContext} from '../context/AuthContext';
import { authApi } from '../misc/AuthApi';
import { handleLogError } from '../misc/Helpers';

export function UserPage()  {
const Auth = useContext(AuthContext);
const [userMe,setUserMe] = useState(null);
const [isUser,setIsUser] = useState(true);
const [isLoading,setIsLoading] = useState(false);
const [orderDescription,setOrderDescription] = useState('');


  useEffect(() => {

    const user = Auth.getUser();
    const isUserLocal = user.data.rol[0] === 'USER';
    setIsUser(isUserLocal);

    handleGetUserMe();
  }, [Auth]);

  const handleInputChange = (e, {name, value}) => {
    console.log(name + ' '+ value);
    setOrderDescription(value);
  }

  const handleGetUserMe = () => {

    const user = Auth.getUser();

    setIsLoading(true);
    authApi.getUserMe(user)
      .then(response => {
       setUserMe(response.data);
      })
      .catch(error => {
        handleLogError(error)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  
  const handleCreateOrder = () => {

   // console.log('Order table ' + 'handleCreateOrder ')
    const user = Auth.getUser();

    let  orderDescriptionLocal  = orderDescription;
    orderDescriptionLocal = orderDescription.trim();
    if (!orderDescriptionLocal) {
      return;
    }

    const order = { description: orderDescription };
    authApi.createOrder(user, order)
      .then(() => {
        handleGetUserMe()
        setOrderDescription('');
      })
      .catch(error => {
        handleLogError(error)
      })
  }

     if (!isUser) {
      return <Navigate to='/' />
    } else {
      // const { userMe, isLoading, orderDescription } = this.state
      return (
        <Container>
          <p>UserPage.js</p>
          <OrderTable
            orders={userMe && userMe.orders}
            isLoading={isLoading}
            orderDescription={orderDescription}
            handleCreateOrder={handleCreateOrder}
            handleInputChange={handleInputChange}
          />
        </Container>
      );
    }
}
