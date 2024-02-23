
import '../styles/components/Navbar.scss'
import { LoginBottom } from './loginButtom'
import { SignupButtom } from './signupButtom'
import { useAuth } from '../hooks/useAuth'; // Ajuste o caminho conforme necessário
import { useSendLogoutMutation } from '../features/authApiSlide';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ModalConfirmacao } from './ModalConfirmação';


export const Navbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const isUserLoggedIn = useAuth();
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await sendLogout();
    navigate('/')
    setIsLogoutModalOpen(false)
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
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
                <button className='logout-button' onClick={handleOpenLogoutModal}>Sair</button>
                </>
              )}
             </section>
        </section>
        <ModalConfirmacao
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
          titulo="Você tem certeza que deseja sair?"
          mensagem="Para sair, clique em Sair, para retornar, clique em Retornar"
          imagem="../../logout.jpg" 
          confirmButtonText="Sair"
          returnButtomText="Retornar"
        />
    </nav>
  )
}
