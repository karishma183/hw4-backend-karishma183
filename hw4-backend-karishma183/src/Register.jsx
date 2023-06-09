import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const initialState ={
    ftype:"",
    quantity:"",
    price:"",
    ratings:""
}
const Register=()=>{
    const [state,setState] = useState(initialState);
   const {ftype,quantity,price,ratings}=state;
   const navigate =useNavigate;
   const addcustomer= async(data)=>{
    const response = await axios.post("http://localhost:5000/register",data);
    if (response.status===200) {
        toast.success(response.data)
    }
   };

   const updateUser= async(data, id)=>{
    const response = await axios.put(`http://localhost:5000/update/${id}`,data);
    if (response.status===200) {
        toast.success(response.data)
    }
   };

   const handleSubmit=(e)=>{
    e.preventDefault();
    if (!ftype||!quantity || !price || !ratings) {
      toast.error("you cannot submit empty form")  
    }else{ if (!id) {
        addcustomer(state);
        navigate('/');
        setTimeout(()=>navigate.push('/'),500)
        
    }else{
        updateUser(state,id)
        navigate('/');
    setTimeout(()=>navigate.push('/'),500)
    }
    
        
    }
    
   }
   const {id} = useParams();
   useEffect(()=>{
    if (id) {
        getSingecustomer(id);
    }
   }, [id])
   
   const getSingecustomer = async(id)=>{
        const response = await axios.get(`http://localhost:5000/singleuser/${id}`);
        if (response.status===200) {
            setState(response.data[0])
        }
    
}


   const handleInputChange=(e)=>{
    let { name, value} = e.target;
    setState({...state, [name]: value})
   };
return (
    <div className="Register">
        <div className="container" style={{marginTop: "100px"}}>
        <h2>Register food menu</h2>
        
        <form  onSubmit={handleSubmit}>
            <div className='inputdiv'>
            <label style={{marginLeft: "1.6rem"}}>Food type:</label>
            <input type="text" style={{marginLeft: "0rem", paddingRight: "0.001rem"}} placeholder='Enter food type' id="fname" name="ftype" required onChange={handleInputChange} value={ftype}/></div>
            <div className='inputdiv'>
            <label style={{marginLeft: "1.6rem"}}>Quantity:</label>
            <input type="text" placeholder='Enter quantity' id="sname" name="quantity" required onChange={handleInputChange} value={quantity}/></div>
            <div className='inputdiv'>
            <label style={{marginLeft: "1.6rem"}}>Price:</label>
            <input type="text" style={{marginLeft: "1.4rem", paddingRight: "0.8rem"}}  placeholder='Enter price' id="phonenumber" name="price" required onChange={handleInputChange} value={price}/></div>
            
            <div className='inputdiv'><label style={{marginLeft: "1.6rem"}}>Ratings:</label>
            <input type="text" style={{paddingRight: "1rem"}} placeholder='Enter your ratings' name="ratings" id="ratings" required onChange={handleInputChange} value={ratings}/></div>
             <input type="submit" style={{marginLeft: "1.5rem", paddingRight: "9rem",paddingLeft: "9rem"}} value={id ? "update" : "Register"}/>
             
        </form>
        </div>
    </div>
)
}
export default Register;