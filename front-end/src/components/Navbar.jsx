
import '../styles/components/Navbar.scss'
import { LoginBottom } from './loginButtom'
import { SignupButtom } from './signupButtom'


export const Navbar = () => {
  return (
    <nav>
        <section className='conteiner'>
            <h1>Workout Mate</h1>
            <section className='login-signup-buttons'>
              <LoginBottom />
              <br />
              <SignupButtom />
             </section>
        </section>
    </nav>
  )
}
