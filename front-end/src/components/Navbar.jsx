
import '../styles/components/Navbar.scss'
import { LoginBottom } from './loginButtom'
import { SignupButtom } from './signupButtom'
import { useAuth } from '../hooks/useAuth'; // Ajuste o caminho conforme necessário
import { useSendLogoutMutation } from '../features/authApiSlide';
import { useNavigate } from 'react-router-dom';



export const Navbar = () => {
  const isUserLoggedIn = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await sendLogout();
    navigate('/')
    // Aqui você pode adicionar qualquer lógica adicional após o logout
  };

  return (
    <nav>
        <section className='conteiner'>
            <h1>Workout Mate</h1>
            <section className='login-signup-buttons'>
            {!isUserLoggedIn ? (
                <>
                  <LoginBottom />
                  <br />
                  <SignupButtom />
                </>
              ) : (
                <>
                <button className='logout-button' onClick={handleLogout}>Sair</button>
                </>
              )}
             </section>
        </section>
    </nav>
  )
}
