import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar() {
  return (
    <nav>
        <Link to='/'>
        <div>
        <img src="https://github.com/primer/brand/assets/19292210/eea6f831-4aa3-4cd2-aa08-a27c03ab0e30" alt='Github Logo'/>
        <h3>Apna Github</h3>
        </div>
        </Link>
        <div>
            <Link to="/create">
            <p>+ Create a repository</p>
            </Link>
            <Link to="/signup">
            <p>Sign Up</p>
            </Link>
            <Link to="/profile">
            <p>Profile</p>
            </Link>

        </div>
    </nav>
  )
}
