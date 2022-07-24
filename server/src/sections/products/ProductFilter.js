import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Rating from "../../components/Ratings";
import { setFilterCategoriesToStore, setMemoriesToStore, setPricesToStore, setRatingToStore } from "../../store/action/filterAction";


export default function ProductFilter({ mobile = false, categories = [], memories = [] }) {
    const { filterCategories, filterMemories, filterRating, filterPrices } = useSelector((state) => state.filter);
    const { themeMode } = useSelector((state) => state.setting);
    const borderColor = (themeMode === 'light' ? 'border-stone-300' : 'border-gray-800');

    const handleFilterMemory = (memory) => {
        const _copied = filterMemories.slice(0, filterMemories.length);
        if (filterMemories.filter((m) => m.capacity === memory.capacity).length === 0) {
            _copied.push(memory);
            setMemoriesToStore(_copied);
        }
        else {
            setMemoriesToStore(_copied.filter((m) => (m.capacity !== memory.capacity)));
        }
    }
    const handleMinPrice = (e) => {
        
        const _value = { min: (parseFloat(e.target.value)), max: Math.max(filterPrices.max, parseFloat(e.target.value)) };
       
        setPricesToStore(_value);
    }
    const handleMaxPrice = (e) => { 
        setPricesToStore({ min: filterPrices.min, max: Math.max(filterPrices.min, parseFloat(e.target.value)) });
    }
    const handleCheck = (e, category) => {
        if (e.target.checked) {
            if (!filterCategories.includes(category.id)) {
                let _categories = filterCategories.slice(0, filterCategories.length);
                _categories.push(category.id);
                setFilterCategoriesToStore(_categories);
            }
        }
        else {
            if (filterCategories.includes(category.id)) {
                let _categories = filterCategories.slice(0, filterCategories.length);
                
                _categories.splice(_categories.indexOf(category.id), 1)
                
                setFilterCategoriesToStore(_categories);
            }
        }
    }
    const handleRatingChanged = (rating) => {

        if (filterRating !== rating && rating >= 0) {
            setRatingToStore(rating);
        }
    }
    useEffect(()=>{
        
        for(const checkbox of document.getElementsByClassName('categoryFilter')){
            checkbox.checked = false;
            for(const checked of filterCategories){
                if(`${checkbox.id}` === `${checked}`){
                    checkbox.checked = true;
                }
            }
        }
    },[filterCategories]);
    return (
        <div className={`grid gap-4`}>
            {/* categories */}
            <div className={`md:border md:rounded-lg md:bg-base-200 border-0  ${borderColor} flex flex-col p-4`}>
                <label className="font-bold uppercase mb-2">Product Categories</label>
                {categories.map((category, index) => (

                    <label className="cursor-pointer label justify-start" key={index}>
                        <input type="checkbox" id ={category.id} className="checkbox categoryFilter" onClick={(e) => handleCheck(e, category)} 
                        ></input>
                        <span className="label-text ml-2 uppercase">{category.slug}</span>
                    </label>
                ))}
            </div>
            {/* price, color, memory , rating, tags */}
            <div className={`md:border md:rounded-lg md:bg-base-200 border-0  ${borderColor}  flex flex-col gap-2 p-4`}>
                <label className="font-bold uppercase mb-2">Filter By Price</label>
                <div className="flex w-full items-center gap-1 justify-between">
                    <span className="flex-none">Min</span>
                    <input type="number" value={filterPrices?.min} onChange={handleMinPrice} step={0.1} className="input w-20 input-sm input-bordered"></input>
                    <span className="flex-none">Max</span>
                    <input type="number" step={0.1} className="input w-20 input-sm input-bordered" value={filterPrices?.max} onChange={handleMaxPrice}></input>
                </div>
                <div className="divider"></div>
                <label className="font-bold uppercase mb-2">Filter By Memory</label>
                <div className="grid grid-cols-3 gap-1">
                    {memories.map((m, index) => (
                        <button className={`btn btn-sm btn-ghost 
                        ${filterMemories.filter(_m => _m.capacity === m.capacity).length === 1 ? 'btn-active' : ''}  
                        
                        `} 
                        key={index} onClick={() => { handleFilterMemory(m) }}>
                            {m.capacity}
                        </button>
                    ))}
                </div>
                <div className="divider"></div>
                <label className="font-bold uppercase mb-2">Average Rating</label>
                <Rating onChanged={handleRatingChanged} value = {filterRating}/>
            </div>
        </div>
    )
}
