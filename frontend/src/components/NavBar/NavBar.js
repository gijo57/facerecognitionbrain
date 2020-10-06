import React from 'react'

const NavBar = ({ handleRouteChange, isSignedIn }) => {
    return (
        isSignedIn ?
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => handleRouteChange('SignIn')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        </nav>
        :
        <div>
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => handleRouteChange('SignIn')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => handleRouteChange('Register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>
        </div>
    )
}

export default NavBar