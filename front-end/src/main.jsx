import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home'
import store from './store/configureStore'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    children: [
      {
        path:"/",
        element: <Home />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router} />
)
