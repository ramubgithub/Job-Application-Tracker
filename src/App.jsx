import './App.css'
import Login from './components/Login/Login'
import AddJobs from './components/AddJobs/AddJobs.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'

function App() {
  
  const route = createBrowserRouter([{
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {index: true,
        element: <Dashboard />
      },
      {path: "/add-job",
       element: <AddJobs />
      }
    ]
  }])

  return (
   <>
        <RouterProvider router={route} />   
   </>
  )
}

export default App
