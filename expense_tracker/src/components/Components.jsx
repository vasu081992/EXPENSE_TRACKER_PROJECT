import { useEffect, useState } from 'react';
import React from "react"
// import ReactModal from 'react-modal';
import "./components.css"
import { useRef } from 'react';
import Modal from './ModalComponent/Modal';
import FormIncome from './FormIncome/FormIncome';
import FormExpense from './FormExpense/FormExpense'
import TransactionCard from './TransactionCard/TransactionCard';
import PieChartComponent from './PieChart/PieChart';
import BarChartComponent from './BarChart/BarChart';
import Pagination from './Pagination/Pagination';
import { FaRupeeSign } from "react-icons/fa";




const Home = () =>{

 
    const [balance, setbalance]=useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalExpenseIsOpen, setmodalExpense] = useState(false);
    const[expense,setexpense]=useState()
    const[expenseList,setExpenseList] =useState([])
    const [isMounted, setIsMounted] = useState(false);
   const [ edit,setEdit]= useState(0)
   const [editDialog,setEditDialog]=useState(false)

const [currentPage, setCurrentPage] = useState(1)
const maxRecords = 3;
const [totalPages, setTotalPages] = useState(0)
const [currentTransactions, setCurrentTransactions] = useState([])
console.log("totalPages",totalPages)
console.log("currentTransactions",currentTransactions)

   const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  console.log("categorySpends",categorySpends)
  console.log("categoryCount",categoryCount)

console.log("use effect mount state",isMounted)

    console.log(expenseList)

    useEffect(() => {

        const startIndex = (currentPage - 1) * maxRecords
        const endIndex = Math.min(currentPage * maxRecords, expenseList.length)

        setCurrentTransactions([...expenseList].slice(startIndex, endIndex))
        setTotalPages(Math.ceil(expenseList.length / maxRecords))

    }, [currentPage, expenseList])

    useEffect(() => {

        if(totalPages < currentPage && currentPage > 1){
            setCurrentPage(prev => prev - 1)
        }

    }, [totalPages])

    useEffect(()=>{

      const balance= localStorage.getItem("balance")

     if(balance){
            setbalance(Number(balance))
     }
     else {
        setbalance(5000);
        localStorage.setItem("balance", 5000);

     }

     const items = JSON.parse(localStorage.getItem("expenses"));

     setExpenseList(items || []);

    setIsMounted(true);

    },[])

    useEffect(()=>{
        
        if (expenseList.length > 0 || isMounted) {
            localStorage.setItem("expenses", JSON.stringify(expenseList));
          }

          
        if (expenseList.length > 0) {
            setexpense(
              expenseList.reduce(
                (accumulator, currentValue) =>
                  accumulator + Number(currentValue.price),
                0
              )
            );
          } else {
            setexpense(0);
          }

   let foodCount = 0;
   let entertainmentCount = 0;
   let travelCount = 0;

   let foodExpenses = 0;
   let entertainmentExpenses = 0
   let travelExpenses =0


   expenseList.forEach((item)=>{
  if(item.category==='food'){
    foodExpenses += Number(item.price)
    foodCount++
  }
  else if(item.category==='entertainment'){
    entertainmentExpenses += Number(item.price)
  entertainmentCount++
  }
  else if(item.category==='travel'){
    travelExpenses += Number(item.price)
    travelCount++
  }
   })

   setCategoryCount({
    food: foodCount,
    entertainment:entertainmentCount ,
    travel: travelCount,
   })

   setCategorySpends({
    food: foodExpenses,
    entertainment: entertainmentExpenses,
    travel: travelExpenses,
   })

    },[expenseList])

    useEffect(()=>{
        
        if(isMounted){
        localStorage.setItem("balance",balance)

        }

    },[balance])


    console.log("balance",balance)

    const openModal = () => {
        setModalIsOpen(true);
    };

    const openExpenseModal = () =>{
        setmodalExpense(true)
    }

    const handleDelete = (id)=>{
        const item = expenseList.find(i => i.id === id)
        const price = Number(item.price)
        setbalance(prev => prev + price)
        setExpenseList(prev => (
            prev.filter(item => item.id !== id)
        ))
    }

 const handleEdit = (id)=>{
    setEdit(id);
    setEditDialog(true)
 }

    const Card = ({buttonName,amount,onClick,classbutton})=>{

        return (
        <div className="expense-tracker">
         <p className={buttonName==="+ Add Income"? "income":"expense" }> <span>{buttonName==="+ Add Income"? "Wallet Balance:":"Expenses:" }</span><FaRupeeSign className='rupee-logo'/>{amount} </p> 
         <button onClick={onClick} className={classbutton}>{buttonName}</button>
         </div>
        )
    }

 
    return (

<>

    <p className='title'>Expense Tracker</p>

<div className='expense-total'> 
<Card buttonName="+ Add Income" onClick={openModal} classbutton={"add_income"} amount={`${balance}`}>
</Card>

<Card buttonName="+ Add expenses" amount={`${expense}`} onClick={openExpenseModal} classbutton={"add_expense"} />
<div className='pie-chart-container'>
<PieChartComponent
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
    </div>
</div>


<div className='transactions-container'>

  <div className='transaction-cards'>
  <h1 className='title'>Recent Transactions</h1>

{

expenseList.length>0? (

    currentTransactions.map((expense)=>(

  <TransactionCard title={expense.title} price={expense.price} date={expense.date} category={expense.category} handleDelete={()=>handleDelete(expense.id)} handleEdit={()=>handleEdit(expense.id)} transactions={expenseList}/>

    )
) )

:
(
<div className='expenses-chart'>
{/* <h1> No transactions found !</h1> */}
<TransactionCard title={"No expenses Found !!"} transactions={expenseList}/>
</div>
)
}
</div>
<div className='bar-chart'>

<BarChartComponent
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
  </div>
  
</div>

{totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}


{/*Modals*/}
<Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>

<FormIncome setisOpen={setModalIsOpen} setbalance={setbalance}/>

</Modal>

<Modal isOpen={modalExpenseIsOpen} setIsOpen={setmodalExpense}>

<FormExpense 
setisOpen={setmodalExpense}
setexpense={setexpense}
setbalance={setbalance}
balance={balance}
expenseList={expenseList}
setExpenseList={setExpenseList} />

</Modal>

<Modal isOpen={editDialog} setIsOpen={setEditDialog}>
                <FormExpense
                    expenseList={expenseList}
                    setExpenseList={setExpenseList}
                    setisOpen={setEditDialog}
                    balance={balance}
                    setbalance={setbalance}
                    editId={edit}
                />
            </Modal>

</>
    )
}

export default Home
