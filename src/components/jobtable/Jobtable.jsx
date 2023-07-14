import "./jobtable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { jobColumns } from "../../jobtablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useEffect} from "react";
import { collection,deleteDoc,doc,onSnapshot } from "firebase/firestore"; //  getDocs,
import {db} from "../../firebase";


const Jobtable = ({typoe}) => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    /*
    const feachData=async()=>{

      let list=[]
 
       try{
      const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
     list.push({id: doc.id,...doc.data()})
  //console.log(doc.id, " => ", doc.data());
});
setData(list);
       }catch(error){

        console.log(error);

       }

    };
    feachData()  */

        // realtime update
        const unsub = onSnapshot(collection(db, "jobs"), (snapShot) => {
          let list=[];
          snapShot.docs.forEach((doc) => {
            list.push({id:doc.id,...doc.data()});
          });
          setData(list)
        },(error)=>{
          console.log(error);
        });
      
        return () => {
          unsub();
        }

  },[]);

  console.log(data)

  const handleDelete = async (id) => {
    try{

      await deleteDoc(doc(db, "jobs", id));
      setData(data.filter((item) => item.id !== id));
    }catch(error){
      console.log(error)
    }
   
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/jobs/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="jobtable">
      <div className="jobtableTitle">
        Add New Job
        <Link to="/jobs/job" className="link">
          Add Job
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={jobColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Jobtable;
