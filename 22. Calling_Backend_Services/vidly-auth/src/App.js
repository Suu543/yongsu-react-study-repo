import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Customers from "./components/Customer";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route
            path="/movies/:movieId"
            element={
              <ProtectedRoute>
                <MovieForm />
              </ProtectedRoute>
            }
          />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
