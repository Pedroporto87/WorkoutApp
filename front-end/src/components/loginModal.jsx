import { useState } from "react";
import '../styles/components/loginModal.scss'


export const LoginModal = ({onClose=()=>{}}) => {

    
    function CloseModal(e){
        e.preventDefault()
        onClose()
    }

  return (
    <>
        <section className="login-modal">
        <div className="overlay" onClick={CloseModal}>
          <div className="modal">
            <span className="close" onClick={CloseModal}>
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
              <a>Não possui conta? Clique aqui</a>
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

