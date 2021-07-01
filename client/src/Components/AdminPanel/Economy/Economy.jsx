import { useEffect, useState } from "react"
import axios from "axios"
import { ADMIN_EXCHANGES, ADMIN_HENRYCOIN } from "../../../Config"
import "./Economy.scss"
import Swal from 'sweetalert2'

export default function Economy () {
    let initialform = {
        ARS: {value:""},
        CLP: {value:""},
        MXN: {value:""},
        COP: {value:""},
    }
    const [exchanges,setExchanges] = useState([])
    const [henrycoin,setHenrycoin] = useState()
    const [formhc,setFormhc] = useState()
    const [formEx,setFormEx] = useState(initialform)
    const [reset,setReset] = useState(false)

    useEffect(()=>{
        let exchanges = axios.get(ADMIN_EXCHANGES)
        let hc = axios.get(ADMIN_HENRYCOIN)
        Promise.all([exchanges,hc])
        .then((res)=>{
            setExchanges(res[0].data)
            setHenrycoin(res[1].data)
            setReset(false)
        })
    },[reset])

    function handleChangeHC (e) {
        setFormhc(Number(e.target.value))
    }

    function handleHC (e) {
        e.preventDefault();
        if(typeof(formhc) === "number"){
            axios.put(ADMIN_HENRYCOIN,{
                idhc: henrycoin[0].id,
                iduser: localStorage.getItem("userlogged"),
                newvalue: formhc
            })
            .then(()=>{
                setReset(true)
                setFormhc("")
                Swal.fire({
                  iconColor: "#49AF41",
                  customClass:{
                    popup: 'popup-final-confirm',
                    title: 'title-final-confirm',
                    input: 'input-confirm',
                    confirmButton: 'confirmButton-confirm',
                  },
                  buttonsStyling:false,
                  title:`Listo!`,
                  icon:"success",
                })})
                .catch(()=>{
                  Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                  })
                })
        }else{
            Swal.fire({
                buttonsStyling:false,
                iconColor: "#F64749",
                customClass:{
                popup: 'popup-order-error',
                title: 'title-order-error',
                input: 'input-order-error',
                confirmButton: 'confirmButton-order-error',
                },
                icon:"error",
                title:"Debes colocar un número"
              })
        }
        
    }

    function handleChangeExchanges (e) {
        setFormEx({
            ...formEx,
            [e.target.name]:{
                value:Number(e.target.value),
                idex:e.target.id
            }
        })
    }
    function handleExchange (e) {
        e.preventDefault();
        if(typeof(formEx[e.target[0].name]?.value) === "number"){
            axios.put(ADMIN_EXCHANGES,{
                idexchange: formEx[e.target[0].name]?.idex,
                newvalue: formEx[e.target[0].name]?.value
            })
            .then(()=>{
                if(localStorage.getItem("currencyname")===e.target[0].name){
                    localStorage.setItem("currency",formEx[e.target[0].name].value)
                }
                setReset(true)
                setFormEx({
                    ...formEx,
                    [e.target[0].name]:{
                        ...[e.target[0].name],
                        value:""
                    }
                })
                Swal.fire({
                iconColor: "#49AF41",
                customClass:{
                    popup: 'popup-final-confirm',
                    title: 'title-final-confirm',
                    input: 'input-confirm',
                    confirmButton: 'confirmButton-confirm',
                },
                buttonsStyling:false,
                title:`Listo!`,
                icon:"success",
                })})
                .catch(()=>{
                Swal.fire({
                    buttonsStyling:false,
                    iconColor: "#F64749",
                    customClass:{
                    popup: 'popup-order-error',
                    title: 'title-order-error',
                    input: 'input-order-error',
                    confirmButton: 'confirmButton-order-error',
                    },
                    icon:"error",
                    title:"Hubo un problema"
                })
                })
        }else{
            Swal.fire({
                buttonsStyling:false,
                iconColor: "#F64749",
                customClass:{
                popup: 'popup-order-error',
                title: 'title-order-error',
                input: 'input-order-error',
                confirmButton: 'confirmButton-order-error',
                },
                icon:"error",
                title:"Debes colocar un número"
              })
        }
    }

    return <div className="container-general-economy">
                <div>
                    <h1 className="title-economy">Panel de Economía</h1>
                    <div className="title-stripe-economy"></div>
                </div>
                <div className="container-economy">
                    <div className="table-inputs">
                        {exchanges?.map(e=>{
                            return <div >
                                        <div className="each-currency-economy">
                                            <h3 className="letters-name-black">{e.currencyName}</h3>
                                            <form className="form-economy" onSubmit={handleExchange}>
                                                <input className="exchange-input" type="number" id={e.id} name={e.currencyName} placeholder="Nuevo valor..." onChange={handleChangeExchanges} value={formEx[e.currencyName].value}/>
                                                <input className="button_modify_economy" type="submit" value="Modificar"/>
                                            </form>
                                        </div>
                                </div>
                        })}
                        <div className="each-currency-economy">
                            <h3 className="letters-name-black">HC</h3>
                            <form className="form-economy" onSubmit={handleHC}>
                                <input type="number" className="exchange-input" placeholder="Nuevo valor..." onChange={handleChangeHC} step=".01" value={formhc}/>
                                <input className="button_modify_economy" type="submit" value="Modificar"/>
                            </form>
                        </div>
                    </div>
                    <div className="actual-values-economy">
                        <div className="value-economy">
                            {exchanges?.map(e=>{
                                return <div className="values-rows">
                                            <h4 className="letters-name-roman-title">Valor Actual:</h4>
                                            <h4 className="letters-name-roman">{e.currencyExChange+" "+e.currencyName} = 1 USD</h4>
                                        </div>
                            })}
                            <div className="values-rows">
                            <h4 className="letters-name-roman-title">Valor Actual:</h4>
                            <h4 className="letters-name-roman">1 HC = {henrycoin?henrycoin[0].exchange:null}USD</h4>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
}
