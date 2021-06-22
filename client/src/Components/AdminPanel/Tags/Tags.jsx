import React from "react";
import './Tags.scss'
function Tags ({tags, setTags, textPlaceholder, json, setJson, subCatSelected}){
    
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			event.target.value = "";
			setJson({...json,categories:subCatSelected, tags:tags})
		}
	};
    return(
        <div className="tags-input">
            <ul id="tags">
            {
                tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<button className='tag-close-icon' onClick={() => removeTags(index)} type='button'>x</button>
					</li>
				))
            }
            </ul>
            <input type='text' onKeyUp={event => event.key === "Enter" ? addTags(event) : null} placeholder={textPlaceholder}></input>
        </div>
    )
}
export default Tags;