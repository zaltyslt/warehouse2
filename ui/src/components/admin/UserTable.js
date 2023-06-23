import React from 'react';
import {Form, Button, Input, Table} from 'semantic-ui-react';

export function UserTable({users, usernameSearch, handleInputChange, handleDeleteUser, handleSearchUser}) {
    const resetSearch = () => {
        handleInputChange('', {name: 'usernameSearch', value: ''});
        handleSearchUser();

    }
    let userList;
    if (users.length === 0) {
        userList = (
            <Table.Row key='no-user'>
                <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
            </Table.Row>
        );
    } else {
        userList = users.map(user => {
            return (
                <Table.Row key={user.id}>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell collapsing>
                        <Button
                            circular
                            color='red'
                            size='small'
                            icon='trash'
                            disabled={user.username === 'admin'}
                            onClick={() => handleDeleteUser(user.username)}
                        />
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Form>
                <Input type='text' action
                       name='usernameSearch'
                       placeholder='Search by Username'
                       value={usernameSearch}
                       onChange={handleInputChange}
                >
                    <input/>

                    <Button circular
                            color='green'
                            size='small'
                            icon='search'
                            onClick={handleSearchUser}
                    />
                    <Button
                        circular
                        color='teal'
                        size='small'
                        icon={'recycle'}
                        onClick={resetSearch}
                    />
                </Input>
            </Form>
            <Table compact striped selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>ID</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Username</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                        <Table.HeaderCell width={5}>Email</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Role</Table.HeaderCell>
                        <Table.HeaderCell width={1}/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userList}
                </Table.Body>
            </Table>
        </>
    );
}