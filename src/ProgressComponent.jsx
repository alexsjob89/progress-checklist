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
   <h2>Checklist</h2>
    {items.map((item) => (
     <div key={item} className='checklist-item'>
    <input type="checkbox"
           checked={completedItems.has(item)}
           onChange={() => handleCheck(item)}

 />
 <label>{item}</label>
 <button className ='delete-btn' style={{
  position: "relative",
  float: "right",
  background: "none",
  border: "none"}} onClick={() => handleDelete(item)}><BiTrash style={{fontSize: "18px",
  color: "orange"}}/></button>
   </div>
    ))}
    <div className="add-item">
     <input
         type="text"
         placeholder='Add new item'
         value={newItem}
         onChange={(e) => setNewItem(e.target.value)}
         onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
         className='add-input'/>
         <button onClick={handleAdd}>Add</button>
    </div>

    </div>
    <div className="title-progressbar">
    <div className="title">
     <h2>Build your page</h2>
     <p>Complete actions to unlock new features along the way.
On average, completed pages get 30% more traffic.</p>
    </div>
    <div className="progress-bar">
     <div className="progress-bar-fill" style={{width: `${progressPercentage}%`}}/>
     <div className="progress-bar-percentage">{progressPercentage}%</div>
    </div>
    <div className="tasks-left" style={{
     marginTop: "20px", fontSize: "15px"

    }}>Tasks left: <span>{tasksLeft}</span></div>
    </div>
    </div>
  )
}

export default ProgressComponent