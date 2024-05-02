import React from 'react'
import Button  from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
import Row  from 'react-bootstrap/Row'

export const UpdateUser = ({formData, handleUpdate, handleSubmit, handleDeregisterUser}) => {
  return (
    <Row>
        <Form onSubmit={handleSubmit}>
            <h3>Update User Profile</h3>
            <Form.Group className='mb-2'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                minLength={3}
                value={formData.username}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter new username'
                />
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>Password:
                </Form.Label>
                <Form.Control
                type="password"   
                minLength={8}
                value={formData.password}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Must be at least 8 characters long'                
                />
            </Form.Group >
            <Form.Group className='mb-2'>
            <Form.Label> Email: </Form.Label>
            <Form.Control
                type="email"          
                value={formData.email}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter new email address'                
            />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                type="date"           
                value={formData.birthday/*.slice(0, 10)*/}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter your birthdate'                 
                />
            </Form.Group>
            <Button variant="primary" type="submit" >Submit Changes</Button>
            <Button
            onClick={() => handleDeregisterUser()}
            variant="danger"
            className="mx-3" >
             Delete account
            </Button>
        </Form>
    </Row>
  )
}