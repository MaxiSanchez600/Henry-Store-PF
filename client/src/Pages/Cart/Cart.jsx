import CartList from '../../Components/Cart/Cartlist/CartList.jsx'
import Cartpay from '../../Components/Cart/Cartpay/Cartpay.jsx'
import CartBar from '../../Components/Cart/CartBar/CartBar.jsx'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'

import './Cart.scss'

export default function Cart(){
    return (
        <div >
            <div className = 'CartConteiner_Cart'>
                <div>
                    <CartBar/>
                    <CartList/>
                </div>
                <Cartpay />
                <Sidebar />
            </div>
        </div>
    );
}
