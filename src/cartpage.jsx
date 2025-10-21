import {useState, useEffect } from "react";
let orderedproducts=JSON.parse(localStorage.getItem('cartitems'))||[]
// function SetDataa({val,api}){
//    let hold=api.find(a=>a.id===Number(val))
//    console.log(hold)
//    if(api.length===0)return null
//    return(
//      <div>
//         <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
//             <img src={hold.image} alt={hold.title} width={100} />
//             <h3>{hold.title}</h3>
//             <p>Price: ${hold.price}</p>
//         </div>
//      </div>
//    )
// }
// function GetDataFromApi(){

//     const[data,setData] = useState([]) 
//     useEffect(()=>{
//        fetch("https://fakestoreapi.com/products")
//        .then(data=>data.json())
//        .then(set=>setData(set))
//     },[])
//     function deleteData(){
//         localStorage.removeItem('cartitems')
//         window.location.href="index.html"
//     }
//     return(
//         <div style={{marginLeft:'auto',marginRight:'auto',width:'70%'}}>
//             <h3>your products</h3>
//             {orderedproducts.map((id,index)=><SetDataa key={index} val={id} api={data} />)}
//             <div>Total price {}</div>
//             <button onClick={deleteData}>place your orders</button>
//         </div>
//     )

// }
function GetDataFromApi({fun}){
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then(data=>data.json())
        .then(set=>fun(set))
    },[])
}
function SetCart({id,setapi}){
    let hold=setapi.find(a=>a.id===Number(id))
    return(
     <div>
        <div style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <img src={hold.image} alt={hold.title} width={100} />
            <h3>{hold.title}</h3>
            <p>Price: ${hold.price}</p>
        </div>
     </div>
    )
}
function SetProducts({tot,api}){
    useEffect(()=>{
        let total=0;
       orderedproducts.map(
        (element)=>{
           let hold=api.filter((a)=>a.id===Number(element))
           total+=hold[0].price
        }
       )
       console.log("hello world")
       tot(total)
    },[])
    return(
      <>
        {orderedproducts.map((element,index)=><SetCart key={index} id={element} setapi={api}/>)}
      </>
    )
}
function Fun1(){
    const[data,setData] = useState([])
    const[total,setTotal] = useState(0)
    function clearCart(){
        localStorage.removeItem('cartitems')
        window.location.href='index.html'
    }
    return(
        <div style={{maxWidth:'700px',marginLeft:'auto',marginRight:'auto'}}>
            <div>your orders</div>
            <GetDataFromApi fun={setData}/>
            {data.length!=0&&<SetProducts tot={setTotal} api={data}/>}
            <h3>Total Price ${total.toFixed(2)}</h3>
            <button onClick={clearCart}>place your order</button>
        </div> 
    )
}
function App(){
    return(
        <>
         <Fun1 />
        </>
    )
}
export default App