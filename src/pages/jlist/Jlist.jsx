import "./jlist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Jobtable from "../../components/jobtable/Jobtable"

const Jlist = () => {
  return (
    <div className="jlist">
      <Sidebar/>
      <div className="jlistContainer">
        <Navbar/>
        <Jobtable/>
      </div>
    </div>
  )
}

export default Jlist