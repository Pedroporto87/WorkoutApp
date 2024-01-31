import '../styles/components/loginModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignupModal, toggleLoginModal } from '../features/modalSlice';

export const LoginModal = () => {
  const dispatch = useDispatch();
  const { showLoginModal } = useSelector((state) => state.modal);
    
  const closeAndToggleLoginModal = (e) => {
    dispatch(toggleSignupModal());
    dispatch(toggleLoginModal());
    
  };

  return (
    <>
        <section className="login-modal">
        <div className="overlay" onClick={() => dispatch(toggleLoginModal())}>
          <div className="modal">
            <span className="close">
              X
            </span>
            <h2>Login</h2>
            <form className="form">
              <br />
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
              <br />
              <a href="#" onClick={() => closeAndToggleLoginModal()}>Não possui conta? Clique aqui</a>
              <button type="button" className="modal-button">
                Login
              </button>
            </form>
          </div>
        </div>
        </section>
      </>
  )
}

