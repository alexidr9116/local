import { useState } from "react"

export default function CategorySearchInput({categories,onChangedCategory,onChangeSearchKey}){
    const [value,setValue] = useState('all');
    const [keyword,setKeyword] = useState('');
    const handleChange = (e)=>{
        setValue(e.target.value);
        if(onChangedCategory)
        onChangedCategory(e.target.value);
    }
    const handleSearch = (e)=>{
        setKeyword (e.target.value);
            
    }

    return(
        <div className="flex w-full rounded-lg ">
            <select className="border-0 select rounded-r-none border-r-[1px]  hidden sm:flex" onChange={handleChange} value={value}>
                <option value = "all" >Select Category..</option>
                {categories.map((category,index)=>(
                    <option value = {category.id} key = {index} className="uppercase">{category.slug}</option>
                ))}
            </select>
            <input 
                onKeyDown={(e)=>{
                    if(e.which === 13){
                        setKeyword(e.target.value);
                        e.preventDefault();
                        onChangeSearchKey(e.target.value);
                    }
                }} 
                onChange = {handleSearch}
                value = {keyword}
            className="input rounded-none rounded-l-lg sm:rounded-none"></input>
            <button className="btn rounded-l-none rounded-r-lg" onClick={()=>onChangeSearchKey(keyword)}>Search</button>
        </div>
    )
}