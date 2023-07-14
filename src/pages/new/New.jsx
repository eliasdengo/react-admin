import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { doc,setDoc} from "firebase/firestore";
import {auth,db,storage} from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data,setData]=useState({});
  const [per,setPerc]=useState(null);
  const navigate=useNavigate()

  useEffect(()=>{
    const uploadFile=()=>{
      const name=new Date().getTime() + ".jpg" ;  // file name with  time date 
    // const fname=auth.user.uid + ".jpg" //file name with id
     // console.log(fname);  // display in console for testing purpose
      const storageRef=ref(storage,`/userImages/${ name }`);   // privoues file name with file.name now change with id 
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed',
            (snapshot)=>{

              const progress=(
                snapshot.bytesTransferred /snapshot.totalBytes
              ) * 100;

              console.log('Upload is' + progress +'% done');
                setPerc(progress)
              switch(snapshot.state){
                case"paused":
                console.log("upload is paused");
                break;
                case "running":
                  console.log("upload is running");
                  break;
                default:
                  break;
              }
            },
            (error)=>{
           console.log(error)
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
               setData((prev)=>({...prev,userImage:downloadURL}))
              });
            }
      )
    };
    file && uploadFile();

  },[file])

  const handleInput=(e)=>{
    const id=e.target.id;
    const value=e.target.value;
    
    setData({...data,[id]:value});

  };

  console.log(data)

  const handleAdd=async(e)=>{
    e.preventDefault()
    try{
    const res=await createUserWithEmailAndPassword(auth,data.email,data.password);
    await setDoc(doc(db,"users",res.user.uid),
    {

  ...data,   // i want add user id in form json bottom this line 
   "id":res.user.uid,  // i try to insert user id in form of json i didn't test i will test it
   "createdAt":new Date(),

    });

    navigate(-1)

  }catch(err){
    console.log(err)
  }

  //console.log(res.user.uid);

  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

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
              <button disabled={per !==null && per<100} type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
