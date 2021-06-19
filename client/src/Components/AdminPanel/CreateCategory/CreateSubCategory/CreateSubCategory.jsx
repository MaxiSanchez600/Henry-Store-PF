import './CreateSubCategory.scss'

function CreateSubCategory ({subCategories, setSubCategories}){
    const onClick = (e)=>{
        const results=subCategories.filter(element => element.name_sub_category !== e.target.value)
        setSubCategories(results)
    }
    return(
        <div className='createSubCategoryContainer'>
            {
                subCategories.map((subCategory, index) =>(
                    <div key={index}>
                        <label>{subCategory.name_sub_category}</label>
                        <button type='button' value={subCategory.name_sub_category} onClick={onClick}>x</button>
                    </div>
                ))
            }
        </div>
        
    )
}


export default CreateSubCategory;