import './App.css'
import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { AuthProvider } from './context/AuthContext'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements,Outlet } from 'react-router-dom';
import { Navbar } from './pages/Navbar'
import { Comment } from './pages/Comment'
import { CreatePost } from './pages/CreatePost'
import { Posts } from './pages/Posts'


export const Root = () => {
  return (
      <div className='main'>
          <Navbar/>
          <main>
              <Outlet />
          </main>

      </div>

  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path='post' element = {<CreatePost/>} />
        <Route path='posts' element = {<Posts/>}/>
        <Route path='profile' element={<Profile />} />
        <Route path=':id' element={<Comment />}/>
      </Route>
      <Route path='signup' element={<SignUp />} />
      <Route path='login' element={<Login />} />
    </>
  )
)

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    // <BrowserRouter>
    //   <AuthProvider>
    //     <div className="App">
    //       <Routes>
    //         <Route path='/' Component={Home}/>

    //         <Route path='signup' Component={SignUp}/>
    //         <Route path='login' Component={Login}/>
    //       </Routes>

    //     </div>
    //   </AuthProvider>
    // </BrowserRouter>
  );
}

export default App;
