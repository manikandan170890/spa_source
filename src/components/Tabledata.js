import React from 'react';
import './Tabledata.css';
import Deletepng from "../img/delete.png";

const Tabledata = (props) => {
    return(
        <div className="table-responsive  tbl mb-4 ">
                    <table className="table   table-sm table-hover">
                    <tbody>
                    {props.spa_data.map((dat, index) => {
                  return (
                    <tr key={index + 1}>                    
                      <td >
                        <p>{dat.spa_date}</p>
                        <h3 className={dat.spa_IE === 1 ? "text-success" : "text-danger"} >{dat.spa_amount} Kc</h3>
                      </td>
                      <td  className="pt-5">{dat.spa_description}</td>
                       <td  className=" display-4">
                        <button
                          type="button"
                          className="btn btn-outline-danger"                     
                          onClick={() => props.spa_delete(dat.spa_id)}
                        >
                           <img src={Deletepng} className="img-fluid" alt="deletepng" />
                        </button>
                      
                      </td>
                    </tr>
                  );
                })}
                       
                     </tbody>
                    </table>
                </div> 
    );
}


export default Tabledata;