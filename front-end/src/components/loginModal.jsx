import '../styles/components/loginModal.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignupModal, toggleLoginModal } from '../features/modalSlice';
//import { useLoginMutation } from '../features/usersApiSlice';
//import { setCredentials } from '../features/authSlice';
import { toast } from 'react-toastify'


export const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()

  //const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if(userInfo){
      navigate("/")
    }
  },[navigate, userInfo])
    
  const closeAndToggleLoginModal = () => {
    dispatch(toggleLoginModal());
    dispatch(toggleSignupModal());
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      //const res = await login({ email, password }).unwrap();
      //dispatch(setCredentials({ ...res }));
      toast.success({msg: "Você esta logado"})
    } catch (error) {
     toast.error({ msg: "Erro no login, confia email e senha"})
    }
  };

  return (
    <>
        <section className="login-modal">
        <div className="overlay" >
          <div className="modal">
            <span className="close" onClick={() => dispatch(toggleLoginModal())}>
              X
            </span>
            <h2>Login</h2>
            <form className="form" onSubmit={submitHandler}>
              <br />
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" value={email} placeholder='Coloque seu e-mail aqui!' name="email" required  onChange={(e) => setEmail(e.target.value)}/>
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder='Coloque sua senha aqui!' value={password} id="password" name="password" required  onChange={(e) => setPassword(e.target.value)}/>
              <br />
              <a href="#" onClick={() => closeAndToggleLoginModal()}>Não possui conta? Clique aqui</a>
              <button type="submit" className="modal-button" >
                Login
              </button>
            </form>
          </div>
        </div>
        </section>
      </>
  )
}

