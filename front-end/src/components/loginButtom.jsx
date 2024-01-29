import { useState } from 'react'
import { LoginModal } from './loginModal'
import '../styles/components/loginBottom.scss'

export const LoginBottom = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const showModal = () => {setShowLoginModal((prev) => !prev)}

  return (
    <div className="login-bottom">
        <button onClick={showModal}>Login</button>
      {showLoginModal ? (<LoginModal onClose={() => setShowLoginModal(false)} />):''}
      
      </div>
  )
}

