import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

export function OrderForm({ orderDescription, handleInputChange, handleCreateOrder }) {
  const createBtnDisabled = orderDescription.trim() === '';
  return (
    <Form onSubmit={handleCreateOrder}>
      <Form.Group>
        <Form.Input
          name='orderDescription'
          placeholder='Description *'
          value={orderDescription}
          onChange={handleInputChange}
        />
        <Button icon labelPosition='right' disabled={createBtnDisabled}>
          Create<Icon name='add' />
        </Button>
      </Form.Group>
    </Form>
  );
}

