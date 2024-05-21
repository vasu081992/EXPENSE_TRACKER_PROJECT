import React from 'react'
import { useState } from 'react';
import styles from './FormIncome.module.css'



export default function FormIncome({setisOpen,setbalance}) {

     const [inputText,setInputText] = useState()

    const handleSubmit = (e) =>{

      e.preventDefault();

      setbalance((prev)=>(prev)+Number(inputText))
    
      setInputText(0)
      
      setisOpen(false)
    }

    const handleInputChange = (e)=>{
        console.log("typed num",e.target.value)
        setInputText(e.target.value)
        
    }

    const handleClose = () =>{
        setisOpen(false)
    }
  return (
    <form onSubmit={handleSubmit}>
      <h1> Add Balance</h1>
    <input type="number"
    value={inputText} // Bind input value to the state
    onChange={handleInputChange}  placeholder="Income amount..."  className={styles.input} required/>
    <button type="submit" className={styles.button}>Add Balance</button> {/*this submission will trigger function at submit in form*/}
    <button onClick={handleClose} className={styles.cancel} >Cancel</button>
</form>
  )
}
