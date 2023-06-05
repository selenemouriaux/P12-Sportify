import {Link} from "react-router-dom";
import './style.css'

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div>
        <h2 className="notFound">
          404
        </h2>
        <h3 className="legend">
          Oups! La page que vous demandez n'existe pas.
        </h3>
        </div>
        <Link className="backHome" to="/">Retourner à la page d'accueil</Link>
      </div>
    </>
  )
}

export default NotFound;