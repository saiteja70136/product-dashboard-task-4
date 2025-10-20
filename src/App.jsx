import { useState,useEffect,useRef } from 'react'
function Doelement({val}){
    return(
      <div className='product-card'>
        <img className='imgsec' src={val.image}/>
        <p>{val.title}</p>
        <p>{val.price}</p>
        <button className='buy-btn'>Buy</button>
      </div>
    )
}
function ForGetData({props}){
    return(
      <div className='grid-container'>
         {props.map((ele,index)=><Doelement key={index} val={ele} />)}
      </div>
    )
}
function Header({alldata,filterdata}){
   const[inputfield,setInput] = useState("")
   useEffect(()=>{
     let tolowc=inputfield.toLowerCase()
     let hold = alldata.filter(e=>e.title.toLowerCase().includes(tolowc))
     filterdata(hold)
   },[inputfield])
   function setInputData(event){
      setInput(event.target.value)
   }
   function onClickHandlar(){
      let tolow = inputfield.toLowerCase()
      let hold=alldata.filter(e=>e.title.toLowerCase().includes(tolow))
      filterdata(hold)
   }
   return(
     <div className='header-sec'>
       <input onChange={setInputData} className='search-field' type='text' />
       <button onClick={onClickHandlar} className='search-btn'>search</button>
     </div>
   )
}
function ForDashboard(){
  const[data,setData] = useState([])
  const[filter,setFilter] = useState([])
  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json())
    .then(set=>{
      setData(set)
      setFilter(set)
    })
  },[])
  return(
    <>
       <ForGetData props={filter}/>
       <Header alldata={data} filterdata={setFilter}/>
    </>
  )
}
function App() {
  return (
    <div>
      <ForDashboard />
    </div>
  )
}

export default App
