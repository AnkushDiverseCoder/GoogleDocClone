
import './App.css'
import Editor from './components/Editor'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { v4 as uuid } from 'uuid';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to={`/docs/${uuid()}`} />
    },
    {
      path: "/docs/:id",
      element: <Editor/>,
    },
    {
      path: "*",
      element: <><div>Page Not Found</div></>,
    },
  ]);  

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
