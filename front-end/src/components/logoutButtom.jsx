import { useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/authApiSlide'
import { useEffect } from 'react'

const LogoutButton = () => {
    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <button
        className="icon-button"
        title="Logout"
        onClick={sendLogout}>Logout
    </button>
  )
}

export default LogoutButton