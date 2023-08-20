import { NavLink } from 'react-router-dom'
import '../styles/Navbar.scss'

export const Navbar = () => {
  return (
    <nav>
        <section className='conteiner'>
            <h1>Workout Mate</h1>
            <NavLink to="/">Login</NavLink>
        </section>
    </nav>
  )
}
