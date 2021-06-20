
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Footer from '../../Components/Footer/Footer'
import CartList from '../../Components/Cart/Cartlist/CartList.jsx'
import Cartpay from '../../Components/Cart/Cartpay/Cartpay.jsx'
import CartBar from '../../Components/Cart/CartBar/CartBar.jsx'
import Sidebar from "../../Components/Sidebar/Sidebar";

import './Cart.scss'

export default function Cart(){
    return (
        <div >
            <Navbar />
                <div className = 'CartConteiner_Cart'>
                        <div>
                            <CartBar/>
                            <CartList/>
                        </div>
                        <Cartpay />
                </div>
            <Footer />
            <Sidebar />
        </div>
    );
}
