import React,{useState,useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import axios  from 'axios';


const View =()=> {
    const[user, setuser]=useState({})
    const {id} = useParams();
    
   useEffect(()=>{
    if (id) {
        getCustomerUser(id)
    }
   }, [id])
   const getCustomerUser = async(id)=>{
    const response = await axios.get(`http://localhost:5000/singleuser/${id}`);
    if (response.status===200) {
        setuser(...response.data)
    }

}
   
    
    
        return (
            <div>
                
                <div style={{marginTop: "150px"}}>
                    <div className="card"  style={{border:"solid gray 2px",marginLeft: "100px"}}>
                        <div className="card-header">
                        <h1>View Food Menu</h1>
                        </div>
                        <div className="cardcontainer" style={{padding: "55px"}} >
                            <strong>ID:</strong>
                            <strong>{user?.id}</strong>
                            <br />
                            <strong>food type:</strong>
                            <strong>{user?.ftype}</strong>
                            <br />
                            <strong>Quantity:</strong>
                            <strong>{user?.quantity}</strong>
                            <br />
                            <strong>Price:</strong>
                            <strong>{user.price}</strong>
                            <br />
                            <strong>Ratings:</strong>
                            <strong>{user?.ratings}</strong>
                            <br />
                            <Link to="/">
                                <button>go home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    
}

export default View;