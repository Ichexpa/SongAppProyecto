import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../components/LoginPage.jsx"
import NotFound404 from "../components/NotFound404"
import MainPage from "../components/MainPage.jsx"
import PlayList from "../components/PlayList.jsx"
import AlbumsList from "../components/AlbumsList.jsx"
import ArtistasList from "../components/ArtistasList.jsx"
import ProtectedRoute from "./AuthRoutes.jsx"
import Layout from "./Layout"
import AlbumDetails from "../components/AlbumDetails.jsx"
import ProfileDetails from "../components/PerfilDetails.jsx"
const Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <MainPage />
      },
      {
        path: "/playlists",
        element: <PlayList />
      },
      {
        path : "/profile",
        element : <ProfileDetails/>
      },
      {
        path: "/albums",
        children: [
          {
            index: true,
            element: <AlbumsList />
          },
          {
            path: ":idAlbum",
            element: <AlbumDetails />
          }
        ]
      },
      {
        path: "/artistas",
        element: <ArtistasList />
      },
      {
        path: "/canciones",
        element: <MainPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound404 />
  }
]);

export default Router;