import React,{useState} from 'react';
import {BiTrash} from "react-icons/bi";

function ProgressComponent({initialItems}) {
 const [completedItems, setCompletedItems] = useState(new Set())
 const [items, setItems] = useState(initialItems)
 const [newItem, setNewItem] = useState('')


 const handleCheck = (item) => {
   if (completedItems.has(item)) {
    setCompletedItems((prevCompledItems) => {
       const updated = new Set(prevCompledItems)
       updated.delete(item)
       return updated
    })
   } else {
    setCompletedItems((prevCompledItems) => new Set(prevCompledItems.add(item)))
   }
 };

 const handleAdd =() => {
   if (newItem.trim()) {
    setItems((prevItems) => [...prevItems, newItem])
    setNewItem('')
   }
 };

 const handleDelete = (item) => {
   setItems((prevItems) => prevItems.filter((i) => i !== item))
   if (completedItems.has(item)) {
    setCompletedItems((prevCompledItems) => {
     const updated = new Set(prevCompledItems)
     updated.delete(item)
     return updated
    })
   }
 }

 const progressPercentage = Math.round((completedItems.size / items.length) * 100)
 const tasksLeft = items.length - completedItems.size;

  return (
    <div className='Progress-component'>
   <div className="checklist">
    {items.map((item) => (
     <div key={item} className='checklist-item'>
    <input type="checkbox"
           checked={completedItems.has(item)}
           onChange={() => handleCheck(item)}
 />
 <label>{item}</label>
 <button className='delete-btn' onClick={() => handleDelete(item)}><BiTrash/></button>
   </div>
    ))}
    <div className="add-item">
     <input
         type="text"
         placeholder='Add new item'
         value={newItem}
         onChange={(e) => setNewItem(e.target.value)}
         onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
         />
         <button onClick={handleAdd}>Add</button>
    </div>
    </div>
    <div className="progress-bar">
     <div className="progress-bar-fill" style={{width: `${progressPercentage}%`}}/>
     <div className="progress-bar-percentage">{progressPercentage}%</div>
    </div>
    <div className="tasks-left">Tasks left: {tasksLeft}</div>
    </div>
  )
}

export default ProgressComponent