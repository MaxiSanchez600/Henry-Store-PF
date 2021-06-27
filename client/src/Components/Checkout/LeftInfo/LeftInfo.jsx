import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import './LeftInfo.scss'
import UserEdit from './UserEdit/UserEdit.jsx'
import AddressEdit from './AddressEdit/AddressEdit';
import NoAddressEdit from './NoAddressEdit/NoAddressEdit';
import { useHistory } from "react-router-dom"
import axios from 'axios';
import {GET_NACIONALITIES} from '../../../Config/index.js'

var Router = require("react-router");

export default function LeftInfo({orderid}){
    let history = useHistory()
    const [webactual, setWebActual] = React.useState("userinfo")
    const [punto1, setPunto1] = React.useState("1. Información y facturación")
    const [punto2, setPunto2] = React.useState("2. Dirección de envio")
    const [userInfo, setUserInfo] = React.useState(false)
    const [userAdress, setuserAdress] = React.useState(false)
    const [residencia, setResidencia] = React.useState("")
    const [nacionality, setNacionality] = React.useState([])
    const nextClick = (residencia) =>{
        setPunto2("1. Información y facturación")
        setPunto1("2. Dirección de envio")
        setResidencia(residencia)
        if(webactual === "userinfo"){
            setWebActual("addressinfo")
        }
    }

    const volverClick = (residencia) =>{
        setPunto2("2. Dirección de envio")
        setPunto1("1. Información y facturación")
        setResidencia(residencia)
        if(webactual === "userinfo"){
            history.goBack()
        }
        else{
            setWebActual("userinfo")
        }
    }

    useEffect(() =>{
        axios.get(GET_NACIONALITIES)
        .then(value =>{
            setNacionality(value.data)
        })
        .catch(error =>{
            alert(error)
        })
    }, [])

    return(
        <div className = 'LeftInfoConteiner_LeftInfo'>
            <div className = 'divTitles_LeftInfo'>
                <h1 className = 'h1Info_LeftInfo'>{punto1}</h1>
                <h1 className = 'h1Info2_LeftInfo'>{punto2}</h1>
            </div>
            {(webactual === "userinfo") && <UserEdit nextClick = {nextClick} volverClick = {volverClick} residenciaSelected = {residencia}/>}
            {(webactual === "addressinfo" && (nacionality.filter(nacion => (nacion.id + "") === (residencia + ""))[0].nacionality === "Argentina")) && <AddressEdit orderid = {orderid} nextClick = {nextClick} volverClick = {volverClick} residenciaSelected = {residencia}/>}
            {(webactual === "addressinfo" && (nacionality.filter(nacion => (nacion.id + "") === (residencia + ""))[0].nacionality !== "Argentina")) && <NoAddressEdit nextClick = {nextClick} volverClick = {volverClick} residenciaSelected = {residencia}/>}
        </div>
    )
}