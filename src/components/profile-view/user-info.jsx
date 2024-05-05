import React from 'react'

export const UserInfo = ({email, name}) => {
  return (
   <div>
    <p><strong>Username:</strong> {name} </p>
    <p><strong>Email:</strong> {email} </p>
    </div>
  )
}