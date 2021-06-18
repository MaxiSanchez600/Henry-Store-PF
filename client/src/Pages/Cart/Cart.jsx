import Header from '../../Components/Header/Header'
import Navbar from '../../Components/NavBar/NavBar'
import SearchBar from '../../Components/SearchBar/SearchBar'
import GeoLocation from '../../Components/GeoLocation/GeoLocation'
import Footer from '../../Components/Footer/Footer'
import CartList from '../../Components/Cart/Cartlist/CartList.jsx'
import Cartpay from '../../Components/Cart/Cartpay/Cartpay.jsx'
import CartBar from '../../Components/Cart/CartBar/CartBar.jsx'

import './Cart.scss'

export default function Cart(){
    return (
        <div className="content_Home" >
            <Header />
            <GeoLocation/>
            <Navbar />
            <SearchBar />
                <div className = 'CartConteiner_Cart'>
                        <div>
                            <CartBar/>
                            <CartList/>
                        </div>
                        <Cartpay />
                </div>
            <Footer />
        </div>
    );
}
