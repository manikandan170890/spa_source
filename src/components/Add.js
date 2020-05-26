import React from "react";


class AddEdit extends React.Component {
  onChangeHandler = e => {
    this.props.onchange(e);
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Date</label>
            <div className="col-sm-8 ">
              <input
                type="date"
                className="form-control"
                name="spa_date"
                id="spa_date"
                value={this.props.values.spa_date}
                onChange={this.onChangeHandler}
               
              />
              <span className="text-danger" >{this.props.errors ? this.props.errors.date : "" }</span>
            </div>
          </div>

          <div className=" form-group row">
            <label className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="spa_description"
                value={this.props.values.spa_description}
                onChange={this.onChangeHandler}
              />
              <span className="text-danger" >{this.props.errors ? this.props.errors.description : ""}</span>
            </div>
          </div>

          

          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Amount</label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control"
                name="spa_amount"
                id="spa_amount"
                value={this.props.values.spa_amount}
                onChange={this.onChangeHandler}
              />
              <span className="text-danger" >{ this.props.errors ? this.props.errors.amount : ""}</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddEdit;
