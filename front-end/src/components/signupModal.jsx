import '../styles/components/signupModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignupModal, toggleLoginModal } from '../features/modalSlice';

export const SignupModal = () => {
  const dispatch = useDispatch();

  const { showSignupModal } = useSelector((state) => state.modal);

  const closeAndToggleLoginModal = (e) => {
    dispatch(toggleSignupModal());
    dispatch(toggleLoginModal());
    showSignupModal(true)
    
  };



  return (
    <>
        <section className='signup-modal'>
        <div className="overlay">
          <div className="modal">
            <span className="close" onClick={() => dispatch(toggleSignupModal())}>
              X
            </span>
            <h2>Cadastro</h2>
            <form className="form">
              <label htmlFor="username">Nome:</label>
              <input type="text" id="username" name="username" required />
              <br />
              <label htmlFor="username">E-mail:</label>
              <input type="text" id="email" name="email" required />
              <br />
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" required />
              <br />
              <label htmlFor="confirmpass">Confirme sua senha:</label>
              <input type="confirmpass" id="confirmpass" name="confirmpass" required />
              <br />
              <a href="#" onClick={() => closeAndToggleLoginModal()}>Já possui conta? Clique aqui</a>
              <button type="button" >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
        </section>
    </>
)}
    
 

