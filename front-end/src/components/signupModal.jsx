import '../styles/components/signupModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleSignupModal, toggleLoginModal } from '../features/modalSlice';
import { useAddNewUserMutation } from '../features/usersApiSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/authSlice'
import { useLoginMutation } from '../features/authApiSlide'
export const SignupModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [addNewUser] = useAddNewUserMutation()
  const [login, { isLoading }] = useLoginMutation();
  const { showSignupModal } = useSelector((state) => state.modal);

  const closeAndToggleLoginModal = () => {
    dispatch(toggleSignupModal());
    dispatch(toggleLoginModal());    
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpass: ''
});

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmpass) {
      alert('As senhas não coincidem');
      return;
  }
  try {
      await addNewUser({
          name: formData.name,
          email: formData.email,
          password: formData.password, // Ajuste esses campos conforme a necessidade do seu backend
      }).unwrap();
      const { accessToken } = await login({ email: formData.email, password: formData.password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      navigate('/aluno-dashboard')
      dispatch(toggleSignupModal());
      alert('Usuário cadastrado com sucesso!');
  } catch (err) {
      alert('Falha ao cadastrar usuário');
      console.error('Falha ao cadastrar usuário', err);
  }
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
            <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="username">Nome:</label>
              <input type="text" id="username" name="name" required  autoComplete="off" onChange={handleChange} value={formData.name}/>
              <br />
              <label htmlFor="username">E-mail:</label>
              <input type="text" id="email" name="email" required onChange={handleChange} value={formData.email}/>
              <br />
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" required onChange={handleChange} value={formData.password} />
              <br />
              <label htmlFor="confirmpass">Confirme sua senha:</label>
              <input type="password" id="confirmpass" name="confirmpass" required onChange={handleChange} value={formData.confirmpass} />
              <br />
              <a href="#" onClick={() => closeAndToggleLoginModal()}>Já possui conta? Clique aqui</a>
              <button type="submit" disabled={isLoading}>
                Cadastrar
              </button>
            </form>
          </div>
        </div>
        </section>
    </>
)}
    
 

