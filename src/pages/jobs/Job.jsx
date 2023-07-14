import "./job.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { doc,setDoc} from "firebase/firestore";
import {db} from "../../firebase";


import { useNavigate } from "react-router-dom";
const Job = ({ inputs, title }) => {

  const [data,setData]=useState({});
  
  const navigate=useNavigate()


  const handleInput=(e)=>{
    const id=e.target.id;
    const value=e.target.value;
    
    setData({...data,[id]:value});

  };

  console.log(data)

  const handleAdd=async(e)=>{
    e.preventDefault()
    try{
    await setDoc(doc(db,"jobs"),
    {

  ...data,   // i want add user id in form json bottom this line 
    // i try to insert user id in form of json i didn't test i will test it
   "createdAt":new Date(),

    });

    navigate(-1)

  }catch(err){
    console.log(err)
  }

  //console.log(res.user.uid);

  }
  return (
    <div className="job">
      <Sidebar />
      <div className="jobContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleAdd}>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                  id={ input.id }
                   type={ input.type }
                    placeholder={ input.placeholder }
                     onChange={ handleInput } />
                </div>
              ))}
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
