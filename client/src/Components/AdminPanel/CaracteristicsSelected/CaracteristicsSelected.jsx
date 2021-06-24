import React, {useState} from 'react';
import Swal from 'sweetalert2';

function CaracteristicsSelected({ json, setJson, carBack, setCarBack }) {
    const [valuesChecked, setValuesChecked]= useState({}) 
/*     "data": [
        {
          "id_caracteristic": 1,
          "name_caracteristic": "color",
          "values_caracteristic": [
            "rojo",
            "azul"
          ]
        },
        {
          "id_caracteristic": 3,
          "name_caracteristic": "talla",
          "values_caracteristic": [
            "s"
          ]
        }
      ], */
    const addValue = async (e) => {
        const { value: valueCar } = await Swal.fire({
            title: 'Añade un valor',
            input: 'text',
            inputLabel: 'Nombre:',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return '¡Debe digitar un nombre!'
                }
            }
            })
    
            if (valueCar) {
                for(let i = 0; i <= carBack.length - 1; i++) {
                    if(carBack[i].name_caracteristic === e.target.title) {
                        let resultCar = carBack[i];
                        resultCar.values_caracteristic.push(valueCar)
                        let copyCarBack = carBack;
                        copyCarBack.splice(i, 1, resultCar);
                        setCarBack([...copyCarBack]);
                    }
                }
              
            Swal.fire(`"${valueCar}" fue añadida con éxito.`)
            }
    }

    const onclose = (e) => {
        let copyJsonCaracteristics = json.caracteristics;
        delete copyJsonCaracteristics[e.target.name];
        setJson({
            ...json,
            caracteristics: copyJsonCaracteristics
        });
    }

    //selecciono los nombres de los valuesCaract que marcaron true
    const idsChekeds = (obj) =>{
        let array=[];
        // por cada objeto, creo array de [keys,values] y selecciono los que sean true
        Object.entries(obj).forEach( e => {
            if(e[1]===true) {
                array.push(e[0])
            }
        })
        return array
    }
    
    const onChangeValueCar = (e) => {
/*         setJson({
            ...json, 
            caracteristics: {
                ...json.caracteristics, 
                [e.target.name]: [e.target.id] 
            }
        });   */
        setValuesChecked({...valuesChecked, [e.target.id]:e.target.checked})
    }

    return (
        <div className='categoriesSelectedContainer'>
            {
                Object.keys(json.caracteristics)?.map( (car, index) => (
                    <div className='tableSubCatWrap' key={index}>
                        {
                            
                            <div className='tableSubCat'>
                                <div className='titleAndClose'>
                                    <div>{car}</div>
                                    <button onClick={onclose} name={car}>x</button>
                                </div>
                                <div>
                                    <div className='checkText'>Seleccione o <span className='addSubCategory' onClick={addValue} title={car}>agregue</span> los posibles valores:</div>
                                    <div className="checksContainer">
                                        {
                                            carBack.find( carBack => carBack.name_caracteristic === car).values_caracteristic?.map( (valueCar, i) => {
                                                
                                                /* return <label key={i}>
                                                    <input 
                                                        type='radio'  
                                                        value={valueCar}
                                                        name={car} 
                                                        checked={json.caracteristics[car].includes(valueCar) ? true : false}
                                                        onChange={onChangeValueCar}
                                                        />
                                                        {valueCar}
                                                    <br/>
                                                </label> */
                                                return <div key={i}>
                                                    <input type='checkbox' name={car} onChange={onChangeValueCar} id={valueCar}></input>
                                                    <label>{valueCar}</label>
                                                </div>
                                            })
                                        }
                                    
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
        </div>
        
    )
}

export default CaracteristicsSelected;