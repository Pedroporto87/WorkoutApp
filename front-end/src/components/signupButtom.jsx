import { SignupModal } from "./signupModal"
import { useState } from "react";
import '../styles/components/signupBottom.scss'

export const SignupButtom = () => {
    const [showSignupModal, setShowSignupModal] = useState(false);

    const showModal = () => {setShowSignupModal((prev) => !prev)}
  return (
    <section className="sign-up-bottom">
        <button onClick={showModal}>Sign Up</button>
        {showSignupModal ? (<SignupModal onClose={() => setShowSignupModal(false)} />):''}
        
    </section>
  )
}
