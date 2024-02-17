import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AlunoDashBoard } from './pages/AlunoDashBoard.jsx';
import store from './store/configureStore';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import Welcome from './pages/Welcome.jsx';
//import { PersistLogin } from './components/PersistLogin';
//import RequireAuth from './components/RequireAuth.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
          <App />
      </Provider>
    ),
    children: [
      { path: '/', element: <Welcome /> },
      {
        path: '/aluno-dashboard',
        element: (
          
              <AlunoDashBoard />
         
        )
      }
      
      // Adicione outras rotas protegidas aqui
    ],
  },
  // Você pode adicionar rotas não protegidas fora do PersistLogin aqui, se necessário
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
