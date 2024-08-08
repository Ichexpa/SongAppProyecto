import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../components/LoginComponents/LoginPage.jsx"
import NotFound404 from "../components/NotFound404"
import MainPage from "../components/MainPage.jsx"
import PlayList from "../components/PlayListComponents/PlayList.jsx"
import AlbumsList from "../components/AlbumComponents/AlbumsList.jsx"
import ArtistasList from "../components/ArtistaComponents/ArtistasList.jsx"
import ProtectedRoute from "./AuthRoutes.jsx"
import ListSongs from "../components/SongComponents/ListSongs.jsx"
import Layout from "./Layout"
import AlbumDetails from "../components/AlbumComponents/AlbumDetails.jsx"
import ProfileDetails from "../components/ProfileComponents/ProfileDetails.jsx"
import {ContextClickEditProvider} from "../contexts/StateEditingContext.jsx"
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
        index : true,
        element : (<ContextClickEditProvider>
                      <ProfileDetails/>
                   </ContextClickEditProvider>)

      },
      {
        path : "/profile",
        element : (<ContextClickEditProvider>
                      <ProfileDetails/>
                   </ContextClickEditProvider>)

      },
      {
        path: "/playlists",
        element: <PlayList />
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
        element: <ListSongs/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound404 />
  }
]);

export default Router;