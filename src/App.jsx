import { useState,useEffect,useRef, Fragment } from 'react'
const products = JSON.parse(localStorage.getItem('cartitems')) || [];
function Doelement({id,val}){
    const reff= useRef(null)
    function printRef(){
       products.push(reff.current.value)
       localStorage.setItem('cartitems',JSON.stringify(products))
    }
    return(
      <div className='product-card'>
        <img className='imgsec' src={val.image}/>
        <p>{val.title}</p>
        <p>${val.price}</p>
        <button ref={reff} value={id} onClick={printRef} className='buy-btn'>Buy</button>
      </div>
    )
}
function ForGetData({props}){
    console.log(props)
    return(
      <div className='grid-container'>
         {props.map((ele)=><Doelement key={ele.id} val={ele} id={ele.id}/>)}
      </div>
    )
}
function Header({alldata,filterdata}){
   const[inputfield,setInput] = useState("")

   useEffect(()=>{
     let tolowc=inputfield.toLowerCase()
     let hold = alldata.filter(e=>e.title.toLowerCase().includes(tolowc))
     console.log(hold)
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
   function cartFunction(){
      window.location.href="cart.html"
   }
   return(
     <div className='header-sec'>
       <input onChange={setInputData} className='search-field' type='text' />
       <button onClick={onClickHandlar} className='search-btn'>search</button>
       <button className='search-btn' onClick={cartFunction}>cart</button>
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
function Counter() {
  const prevCountRef = useRef(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
function App() {
  return (
    <>
      <ForDashboard />
    </>
  )
}
export default App
