import '../styles/components/signupModal.scss'

export const SignupModal = ({onClose=()=>{}}) => {

    function CloseModal(e){
        e.preventDefault()
        onClose()
    }
  return (
    <>
        <section className='signup-modal'>
        <div className="overlay" onClick={CloseModal}>
          <div className="modal">
            <span className="close" onClick={CloseModal}>
              X
            </span>
            <h2>Sign Up</h2>
            <form className="form">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" required />
              <br />
              <label htmlFor="username">E-mail:</label>
              <input type="text" id="email" name="email" required />
              <br />
              <label htmlFor="newPassword">Password:</label>
              <input type="password" id="password" name="password" required />
              <br />
              <a>Já possui conta? Clique aqui</a>
              <button type="button" >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        </section>
    </>
)}
    
 

