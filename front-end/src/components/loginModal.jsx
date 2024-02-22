import '../styles/components/loginModal.scss'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSignupModal, toggleLoginModal } from '../features/modalSlice';
import { setCredentials } from '../features/authSlice'
import { useLoginMutation } from '../features/authApiSlide'



export const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('')
  const userRef = useRef()
  const errRef = useRef()
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus()
}, [])

useEffect(() => {
    setErrMsg('');
}, [email, password])

    
  const closeAndToggleLoginModal = () => {
    dispatch(toggleLoginModal());
    dispatch(toggleSignupModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { accessToken } = await login({ email, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setEmail('')
        setPassword('')
        navigate('/aluno-dashboard')
        dispatch(toggleLoginModal())
        
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
}
const errClass = errMsg ? "errmsg" : "offscreen"
if (isLoading) return <p>Loading...</p>


  return (
    <>
        <section className="login-modal">
        <div className="overlay" >
          <div className="modal">
            <span className="close" onClick={() => dispatch(toggleLoginModal())}>
              X
            </span>
            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
            <h2>Login</h2>
              <section className="divider">
                <span className="line"></span>
                <img className='divider-icon' src={'barbell.png'} />
                <span className="line"></span>
              </section>
            <form className="form" onSubmit={handleSubmit}>
              <br />
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" value={email} ref={userRef} autoComplete="off" placeholder='Coloque seu e-mail aqui!' name="email" required  onChange={(e) => setEmail(e.target.value)}/>
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" placeholder='Coloque sua senha aqui!' value={password} id="password" name="password" required  onChange={(e) => setPassword(e.target.value)}/>
              <br />
              <a href="#" onClick={() => closeAndToggleLoginModal()}>Não possui conta? Clique aqui</a>
              <button type="submit" className="modal-button"  >
                Login
              </button>
            </form>
          </div>
        </div>
        </section>
      </>
  )
}

