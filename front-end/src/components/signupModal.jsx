import { useState } from "react";

export const SignupModal = () => {
  return (
    <>
        <section className="signup-modal">
        <div className="overlay" onClick={() => closeModal('signup')}>
          <div className="modal">
            <span className="close" onClick={() => closeModal('signup')}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form className="form">
              <label htmlFor="newUsername">Username:</label>
              <input type="text" id="newUsername" name="newUsername" required />
              <br />
              <label htmlFor="newPassword">Password:</label>
              <input type="password" id="newPassword" name="newPassword" required />
              <br />
              <button type="button" >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        </section>
    </>
)}
    
 

