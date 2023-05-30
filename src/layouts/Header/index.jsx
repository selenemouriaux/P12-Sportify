import './style.css'
import logo from '../../assets/images/sportsee_full_logo.png'
import {NavLink, Link} from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="headerLogo">
        <img src={logo} alt="Logo Sportsee"/>
      </Link>
      <nav className="headerMenu">
        <NavLink className={({ isActive }) => `headerMenuItem ${isActive? " activeItem" : ""}`} to="/">Accueil</NavLink>
        <NavLink className={({ isActive }) => `headerMenuItem ${isActive? " activeItem" : ""}`} to="/profile">Profil</NavLink>
        <NavLink className={({ isActive }) => `headerMenuItem ${isActive? " activeItem" : ""}`} to="/settings">Réglages</NavLink>
        <NavLink className={({ isActive }) => `headerMenuItem ${isActive? " activeItem" : ""}`} to="/community">Communauté</NavLink>
      </nav>
    </div>
  )
}

export default Header;