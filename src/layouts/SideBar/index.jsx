import './style.css'
import {default as activities} from '../../data/activities.json'
import {Link, NavLink} from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBarIcons">
        {activities.map(({id, name, icon}) => <NavLink to={`/activity/${id}`} key={id} className={({isActive}) => `sideBarActivity ${isActive ?  " activeIcon" : ""}`}>
            <img src={icon} alt={`icone de l'activité ${name}`}/>
          </NavLink>
        )}
      </div>
      <Link to="/about" className="sideBarCopyrights">
        Copyright, SportSee 2020
      </Link>
    </div>
  )
}

export default SideBar;