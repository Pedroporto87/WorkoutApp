import { SignupModal } from "./signupModal"
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignupModal } from '../features/modalSlice';
import '../styles/components/signupBottom.scss'

export const SignupButtom = () => {
  const dispatch = useDispatch();
  const { showSignupModal } = useSelector((state) => state.modal);

  const showModal = () => {
    dispatch(toggleSignupModal());
  };
  return (
    <section className="sign-up-bottom">
        <button onClick={showModal}>Sign Up</button>
        {showSignupModal ? <SignupModal />:''}
        
    </section>
  )
}
