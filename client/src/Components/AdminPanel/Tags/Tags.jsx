import React from "react";
import './Tags.scss'
import { IoMdCloseCircle } from "react-icons/io";
function Tags ({textPlaceholder, json, setJson}){
    
	const removeTags = indexToRemove => {
		setJson({
			...json, 
			tags: json.tags.filter((_, index) => index !== indexToRemove)
		});
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setJson({
				...json, 
				tags: [...json.tags, event.target.value]
			})
			event.target.value = "";
		}
	};
    return(
        <div className="tags-input">
            <ul id="tags">
            {
                json.tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						{/* <button className='tag-close-icon' onClick={() => removeTags(index)} type='button'>x</button> */}
						<IoMdCloseCircle className='tag-close-icon' onClick={() => removeTags(index)} type='button' size='1.3em'/>
					</li>
				))
            }
            </ul>
            <input type='text' onKeyUp={event => event.key === "Enter" ? addTags(event) : null} placeholder={textPlaceholder}></input>
        </div>
    )
}
export default Tags;