import React from 'react';
import _ from 'lodash';
import Add from "./Add";
import Header from './Header';
import Tabledata from "./Tabledata";

const local_key = "SPA_DATA";
class List extends React.Component {
    constructor() {
        super();
        this.state = {
            spa_id: "",
            spa_date: "",     
            spa_description: "",
            spa_IE: "",
            spa_amount: "",
            spa_data: [],
            isspending: false,
            errors:{},
            message: "",
            income:"",
            Spending:"",
            total: ""
        }
    }


    componentDidMount() {
        this.setState({ spa_data: JSON.parse(localStorage.getItem(local_key)) || [] },
        () => {this.header_index()});       
         //show amount in Header page        
      }

    header_index() {    // calculate the total,income and Expense
        let incoming = 0;
        let spending = 0;
        let total = 0;
        const sum_tot = this.state.spa_data;
        const inc = sum_tot.filter((item) => item.spa_IE === 1); 
        const spen = sum_tot.filter((item) => item.spa_IE === 0); 
        if(inc){
          incoming = _.sumBy(inc, function(o) { return parseInt(o.spa_amount); });  
        }
       
        if(spen){
        spending = _.sumBy(spen, function(o) { return parseInt(o.spa_amount); });
          total = incoming - spending;  
        }
        
          this.setState({incoming,spending,total});
    }

    onChangeHandler = data => {  //store the values in set state
        this.setState({ [data.target.name]: data.target.value });    
      };

    
    fieldEmpty = () => {  //  clear the field values after add/edit form
        this.setState({spa_id:""});
        this.setState({spa_date:""});
        this.setState({spa_description:""});
        this.setState({spa_IE:""});
        this.setState({spa_amount:""});    
        this.setState({errors:null}); 
      }

      validation(){  //Valiation chacking
        let errors={};
        let formIsValid = true;
       
        if(!this.state.spa_date){
            formIsValid = false;
            errors["date"]=" Date Required";
        }
    
        if(!this.state.spa_description){
            formIsValid = false;
            errors["description"]=" Description Required";
        }    
    
        if(!this.state.spa_amount){
            formIsValid = false;
            errors["amount"]=" Amount Required";
        }
    
        if(isNaN(this.state.spa_amount)) {
          formIsValid = false;
          errors["amount"]=" Amount should be numaric";
        }

        if(this.state.spa_amount > this.state.total && this.state.isspending === true){
          formIsValid = false;
          errors["amount"]=" Out of Limit";
        }
       
        this.setState({errors}); 
        return formIsValid;
      }
    
      message(msg){ //updating messages
        this.setState({message: msg});
        setTimeout(
            function() {
                this.setState({message: ""});
            }
            .bind(this),
            1000
        );  
      }

    onSubmitHandler = e => {  //Submit handler for both Add/Edit using W_id
        e.preventDefault();
        if(this.validation()) {  //Checking the validation
            this.setState({error:null}); //success the validation then reassign null to error state
        const new_data = {
            spa_id: 1 + Math.random(),
            spa_date: this.state.spa_date,
            spa_description: this.state.spa_description,
            spa_IE: this.state.isspending ? 0 : 1,//this.state.w_IE,
            spa_amount: this.state.spa_amount
            };
            const data = this.state.spa_data;
            data.push(new_data);                  
            this.setState(({spa_data: data}),()=> { 
                this.message("Added Successfully");
                localStorage.setItem(local_key, JSON.stringify(this.state.spa_data));
                this.header_index();
                this.fieldEmpty();
            });
             
        }

    }

      isPopup = () => {
        this.setState({ isspending: true });         
      };


    spa_delete =id => {
    
        const oldlist =  [...this.state.spa_data];
        const spa_data = oldlist.filter((item) => item.spa_id !== id);           
        this.setState({spa_data}, () => { 
            localStorage.removeItem(local_key);
            localStorage.setItem(local_key, JSON.stringify(this.state.spa_data));
            this.header_index();
        });
       
         
        //bake_cookie(cookie_key, w_data);
              
    }


    render(){
        return(
            <React.Fragment>
                 <div className="container">
                      <Header  index_head = {this.state ? this.state : ""}/>
                      <Tabledata spa_data = {this.state.spa_data} spa_delete ={this.spa_delete} />
                 </div>


                 <div className="row mb-4">
                <div className="col-sm-6  ">
                    <button className="btn btn-block btn-success float-right "
                    data-toggle="modal" data-target="#spaModal"
                    onClick={() => {
                        this.setState({isspending:false});
                      }}
                    >Add Income</button>
                </div>
                <div className="col-sm-6 ">
                <button className="btn btn-block btn-danger"
                data-toggle="modal" data-target="#spaModal"
                onClick={() => this.isPopup()}
                >Add Spending</button>
                </div>
            </div>
            
           
            <div className="modal fade" id="spaModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Add Income</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                  <Add onchange={ this.onChangeHandler }  values= {this.state} errors={this.state.errors} />
                  </div>
                  <div className="modal-footer">
                  {this.state.message ?
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong> {this.state.message}</strong> 
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                    :''}
                  <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.fieldEmpty}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmitHandler}
                >
                 Save
                </button> 

                  </div>
                </div>
              </div>
            </div>


            </React.Fragment>
        );
    }
}


export default List;