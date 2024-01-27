import { useState } from "react";


export const LoginModal = () => {

  return (
    <>
        <section className="login-modal">
        <div className="overlay" onClick={() => closeModal('login')}>
          <div className="modal">
            <span className="close" onClick={() => closeModal('login')}>
              &times;
            </span>
            <h2>Login</h2>
            <form className="form">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required />
              <br />
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
              <br />
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" required />
              <br />
              <button type="button" >
                Login
              </button>
            </form>
          </div>
        </div>
        </section>
      </>
  )
}

