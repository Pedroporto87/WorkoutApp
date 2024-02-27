import { Outlet, Link } from "react-router-dom";
import { useEffect } from 'react';
import { useRefreshMutation } from "../features/authApiSlide";
import usePersist from "../hooks/usePersist";
import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/authSlice";
import { AlunoDashBoard } from "../pages/AlunoDashBoard";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading, isError, error }] = useRefreshMutation();

  useEffect(() => {
      if (!token && persist) {
          refresh().catch(console.error);
      }
  }, [token, persist, refresh]);

  if (!persist || token) {
      return <Outlet />;
  } else if (isLoading) {
      // Considerar adicionar um spinner ou mensagem de carregamento
      return <div>Loading...</div>;
  } else if (isError) {
      return (
          <p className='errmsg'>
              {`${error?.data?.message} - `}
              <Link to="/login">Please login again</Link>.
          </p>
      );
  }

  // Caso padrão
  return <AlunoDashBoard />;
};

export default PersistLogin;