import React from "react";
import './CategoriesSelected.scss'
import Swal from 'sweetalert2';

function CategoriesSelected ({ json, setJson, catBack, setCatBack }){
   
    const onClose = e => {
        let copyJsonCategories = json.categories;
        delete copyJsonCategories[e.target.name];
        setJson({
            ...json,
            categories: copyJsonCategories
        });
    };

    const onChangeSubCat = e => {
        setJson({
            ...json, 
            categories: {
                ...json.categories, 
                [e.target.name]: [e.target.value] 
            }
        });  
    };

    const addSubcategory = async (e) => {
        const { value: subCategory } = await Swal.fire({
            title: 'Añada una subcategoría',
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
            inputValidator: (value) => {
                if (!value) {
                    return '¡Debe digitar un nombre para la subcategoria!';
                }
            }
        });
        if (subCategory) {
            for(let i = 0; i <= catBack.length - 1; i++) {
                if(catBack[i].name_category === e.target.title) {
                    let resultCat = catBack[i];
                    resultCat.SubCategories.push({ name_sub_category: subCategory[0].toUpperCase() + subCategory.slice(1) });
                    let copyCatBack = catBack;
                    copyCatBack.splice(i, 1, resultCat);
                    setCatBack([...copyCatBack]);
                }
            }
            return Swal.fire({
                icon: 'success',
                title: 'Agregada con éxito',
                showConfirmButton: false,
                timer: 1400
            });
        }
    };
    
    return (
        <div className='categoriesSelectedContainer'>
            {Object.keys(json.categories)?.map( (cat, index) => (
                <div className='tableSubCatWrap' key={index}>
                    <div className='tableSubCat'>
                        <div className='titleAndClose'>
                            <div>{cat}</div>
                            <button onClick={onClose} name={cat}>x</button>
                        </div>
                        <div>
                            <div className='checkText'>Seleccione o <span className='addSubCategory' onClick={addSubcategory} title={cat}>agregue</span> una subcategoría:</div>
                            <div className="checksContainer">
                                {catBack.find( catBack => catBack.name_category === cat)?.SubCategories?.map( (subCat, i) => {
                                    
                                    return <label key={i}>
                                        <input 
                                            type='radio'  
                                            value={subCat.name_sub_category}
                                            name={cat} 
                                            checked={json.categories[cat].includes(subCat.name_sub_category) ? true : false}
                                            onChange={onChangeSubCat}
                                            />
                                            {subCat.name_sub_category}
                                        <br/>
                                    </label>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default CategoriesSelected;