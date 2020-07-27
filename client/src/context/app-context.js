import React from 'react'

export default React.createContext({
    user: 'Default',
    admin: '0',
    updateUser: user => {},
    updateAdmin: admin => {},
    resetUser: () => {}
})