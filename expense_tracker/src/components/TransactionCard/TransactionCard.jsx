import React from 'react'
import styles from "./Transaction.module.css"
import { MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { MdOutlineLocalPizza } from "react-icons/md";
import { MdCardTravel } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { useState } from 'react';

export default function TransactionCard({title,price,date,category,handleDelete,handleEdit}) {



    return (
    <div className={styles.card}>
     
     <div className={styles.leftFlex}>
     { category ==='food'&&
    (
<MdOutlineLocalPizza className={styles.image} />
    )
    }

{ category ==='travel'&&
    (
<MdCardTravel  className={styles.image} />
    )
    }

    
{ category ==='entertainment'&&
    (
<BiCameraMovie  className={styles.image} />
    )
    }

 <div className={styles.title}>
    <h3> {title} </h3>
    <p className={styles.date}> {date} </p>
</div>
</div>

<div className={styles.rightflex}>
    <p className={styles.price}> <FaRupeeSign/> {price} </p>
    <button className={styles.cardEdit} onClick={handleEdit}>
    <MdEdit />
    </button>
    <button className={styles.cardDelete} onClick={handleDelete}>
    <IoIosClose/>                   
     </button>
 </div>

    
  
    </div>
  )

}

