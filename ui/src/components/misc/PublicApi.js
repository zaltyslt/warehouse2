import axios from 'axios';
import { config } from '../../Constants';

export const publicApi = {
  numberOfUsers,
  numberOfOrders,
  getMenus,
  createOrder,
  getClients,
  getClientsTopByQuantity,
  getClientsTopByWeight,
  createClient,
  createItem,
  trashItem,
}

function trashItem(itemId){
  console.log(itemId);
  return instance.delete(`/api/items?id=${itemId}`, {
    headers: {
      'Content-type': 'application/json',
    }
  })
}
function createItem(item){
console.log(item);
  return instance.post('/api/items', item, {
    headers: {
      'Content-type': 'application/json',
    }
  })
}

function createClient(client){
 client = {...client, id: null,  items: [],};
  return instance.post('/api/clients', client, {
    headers: {
      'Content-type': 'application/json',
    }
  })
}
function getClients(text) {
  console.log(text);
  const url = text ? `/api/clients?text=${text}` : '/api/clients'
  return instance.get(url);

}
function getClientsTopByQuantity() {

  const url = `/api/reports/byQuantity`;
  return instance.get(url);

}
function getClientsTopByWeight() {

  const url = `/api/reports/byWeight`;
  return instance.get(url);

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

