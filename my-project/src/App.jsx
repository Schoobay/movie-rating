//  Hooks
import { useState, useEffect } from "react";
import "./App.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "./firebase/config";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
import Loading from "./components/Loading";

//  Routes
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

//  Components
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

//  Pages
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Details from "./pages/Details";
import AddMovie from "./pages/AddMovie";
import RecentReviews from "./pages/RecentReviews";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
      setUserChecked(true);
      const current = auth.currentUser.email;
      const userName = current ? current.replace("@gmail.com", "") : "";
      setUserName(userName);
    });

    return () => {
      unsubscribe(); // Clean up the auth
    };
  }, []);

  // Show loading while checking user status
  if (!userChecked) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/sign-in'
            element={
              user === false ? (
                <SignIn userName={userName} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route element={<Layout />}>
            <Route
              path='/'
              element={
                user === true ? (
                  <Home userName={userName} />
                ) : (
                  <Navigate to='/sign-in' />
                )
              }
            />
            <Route
              path='/add-movie'
              element={<AddMovie userName={userName} />}
            />
            <Route path='/recent-reviews' element={<RecentReviews />} />
            <Route
              path='/details/:id'
              element={<Details userName={userName} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
