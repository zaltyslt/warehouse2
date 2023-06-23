import axios from 'axios';
import { config } from '../../Constants';

export const publicApi = {
  numberOfUsers,
  numberOfOrders,
  getMenus,
  createOrder,
}

function numberOfUsers() {
  console.log('ateina');
  return instance.get('/public/numberOfUsers');
}

function numberOfOrders() {
  return instance.get('/public/numberOfOrders')
}

function getMenus() {
  return instance.get('/public/menus')
}
function createOrder(order) {
  console.log(order);
  return instance.post('/public/orders', order, {
    headers: {
      'Content-type': 'application/json',
    }
  })

}
const instance = axios.create({
  baseURL: config.url.API_BASE_URL
});

