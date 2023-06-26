import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import {PrivateRoute} from './components/misc/PrivateRoute'
import {Navbar} from './components/misc/Navbar'
import {ClientList} from "./components/client/ClientList";
import {ClientCreate} from "./components/client/ClientCreate";
import {ClientView} from "./components/client/ClientView";
import {Home} from './components/home/Home'
import {Login} from './components/home/Login'
import {Signup} from './components/home/Signup'
import {AdminPage} from './components/admin/AdminPage'
import {UserPage} from './components/user/UserPage'
import {ItemCreate} from "./components/inventory/ItemCreate";
import {Reports} from "./components/reports/Reports";

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/*<Route path='/' element={<Home />} />*/}
          <Route path='/' element={<ClientList />} />
          <Route path='/clientcreate' element={<ClientCreate />} />
          <Route path='/clientview/:id' element={<ClientView />} />
          <Route path='/itemcreate/:id' element={<ItemCreate />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>}/>
          <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>}/>
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
