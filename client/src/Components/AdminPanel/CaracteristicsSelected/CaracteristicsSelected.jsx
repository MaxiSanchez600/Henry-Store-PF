import React from 'react';
import Swal from 'sweetalert2';

function CaracteristicsSelected({ json, setJson, carBack, setCarBack }) {

    const addValue = async e => {
        const { value: valueCar } = await Swal.fire({
            title: 'Añada un valor',
            input: 'text',
            inputLabel: 'Nombre:',
            buttonsStyling:false,
            iconColor: "#F64749",
            showCancelButton:false,
            inputPlaceholder:'Nombre',
            inputLabel:false,
            confirmButtonText:'Agregar',
            customClass:{
                popup:'popCreate',
                title:'titlePopCreate',
                confirmButton:'confirmBtnCreate',
                input:'inputPopCreate',
            },
            inputValidator: value => {
                if (!value) {
                    return '¡Debe digitar un nombre!';
                }
            }
        });
        if (valueCar) {
            for(let i = 0; i <= carBack.length - 1; i++) {
                if(carBack[i].name_caracteristic === e.target.title) {
                    let resultCar = carBack[i];
                    resultCar.values_caracteristic.push(valueCar[0].toUpperCase() + valueCar.slice(1)); 
                    let copyCarBack = carBack;
                    copyCarBack.splice(i, 1, resultCar);
                    setCarBack([...copyCarBack]);
                }
            }
            return Swal.fire({
                icon: 'success',
                title: 'Agregado con éxito',
                showConfirmButton: false,
                timer: 1400
            });
        }
    };

    const onClose = e => {
        let copyJsonCaracteristics = json.caracteristics;
        delete copyJsonCaracteristics[e.target.name];
        setJson({
            ...json,
            caracteristics: copyJsonCaracteristics
        });
    };
    
    const onChangeValueCar = e => {
        if(json.caracteristics[e.target.name].includes(e.target.value)) {
            setJson({
                ...json,
                caracteristics: {
                    ...json.caracteristics,
                    [e.target.name]: json.caracteristics[e.target.name].filter(val => val !== e.target.value)
                }
            });
        } else {
            setJson({
               ...json, 
               caracteristics: {
                   ...json.caracteristics, 
                   [e.target.name]: [
                       ...json.caracteristics[e.target.name], 
                       e.target.value
                   ] 
               }
            });
        }
    };

    return (
        <div className='categoriesSelectedContainer'>
            {Object.keys(json.caracteristics)?.map( (car, index) => (
                <div className='tableSubCatWrap' key={index}>
                    <div className='tableSubCat'>
                        <div className='titleAndClose'>
                            <div>{car}</div>
                            <button onClick={onClose} name={car}>x</button>
                        </div>
                        <div>
                            <div className='checkText'>Seleccione o <span className='addSubCategory' onClick={addValue} title={car}>agregue</span> los posibles valores:</div>
                            <div className="checksContainer">
                                {carBack.find( carBack => carBack.name_caracteristic === car)?.values_caracteristic?.map( (valueCar, i) => {
                                    return <div key={i}>
                                        <input 
                                            type='checkbox' 
                                            name={car} 
                                            onChange={onChangeValueCar} 
                                            value={valueCar}
                                            checked={json.caracteristics[car].includes(valueCar) ? true : false}
                                        />
                                        <label>{valueCar}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}  
        </div>
    )
}

export default CaracteristicsSelected;