import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from '../features/modalSlice';
import { LoginModal } from './loginModal'
import '../styles/components/loginBottom.scss'

export const LoginBottom = () => {
  const dispatch = useDispatch();
  const { showLoginModal } = useSelector((state) => state.modal);

    const showModal = () => {
      dispatch(toggleLoginModal());
    };

  return (
    <div className="login-bottom">
        <button onClick={showModal}>Login</button>
      {showLoginModal ? <LoginModal />:''}
      
      </div>
  )
}

