import React from 'react'
import Button  from 'react-bootstrap/Button'
import  Form  from 'react-bootstrap/Form'
import Row  from 'react-bootstrap/Row'

export const UpdateUser = ({formData, handleUpdate, handleSubmit, handleDeleteAccount}) => {
  return (
    <Row>
        <Form onSubmit={handleSubmit}>
            <h3>Update User Information</h3>
            <Form.Group className='mb-2'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                defaultValue={user.Username}
                minLength={3}
                value={formData.username}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter a username'
                />
            </Form.Group>
            <Form.Group className='mb-2'>
                <Form.Label>Password:
                <p>Your new password must be at least 8 characters long.</p>
                </Form.Label>
                <Form.Control
                type="password"
                defaultValue=''                
                minLength={8}
                value={formData.password}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Your new password must be at least 8 characters long'                
                />
            </Form.Group >
            <Form.Group className='mb-2'>
            <Form.Label> Email: </Form.Label>
            <Form.Control
                type="email"
                defaultValue={user.Email}                
                value={formData.email}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter your email address'                
            />
            </Form.Group>
            <Form.Group className='mb-4'>
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                type="date"
                defaultValue={user.Birthdate}                  
                value={formData.birthDate.slice(0, 10)}
                onChange={(e) => handleUpdate(e)}
                required
                placeholder='Enter your birthdate'                 
                />
            </Form.Group>
            <Button variant="primary" type="submit" >Submit Changes</Button>
            <Button
            onClick={() => handleDeleteAccount()}
            variant="outline-secondary"
            className="mx-3" >
             Delete account
            </Button>
        </Form>
    </Row>
  )
}