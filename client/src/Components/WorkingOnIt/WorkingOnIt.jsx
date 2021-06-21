import workingH from "../../Assets/Images/placeholder.png"
import Footer from "../Footer/Footer"
import NavBar from "../NavBar/NavBar"
import "./WorkingOnIt.scss"


export default function WorkingOnIt () {
    return <div className="container_working">
        <NavBar></NavBar>
        <img className="working_image" src={workingH}/>
        <Footer></Footer>
    </div>
}