import React, { Component } from "react";
import Swal from "sweetalert2";

export default class UserProfile extends Component {
  state = {
    values: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
  handleChangeValue = (event) => {
    let { name, value, type } = event.target;
    let newValues = { ...this.state.values, [name]: value };
    let newErrors = { ...this.state.errors };
    if (value.trim() === "") {
      newErrors[name] = name + " is required";
    } else {
      newErrors[name] = "";
    }
    //check email
    if (type === "email") {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let flag = regex.test(String(value).toLocaleLowerCase());
      if (!flag) {
        newErrors[name] = name + " is invalid";
      } else {
        newErrors[name] = "";
      }
    }
    //check password
    if (name === "confirmPassword") {
      if (value === newValues["password"]) {
        newErrors[name] = "";
      } else {
        newErrors[name] = name + " is invalid. Please fill it again!";
      }
    }
    this.setState({
      values: newValues,
      errors: newErrors,
    });
    // this.setState({
    //   values: {...this.state.values, [name]: value}
    // }, () => {
    //   console.log(this.state);
    // });
    // khong nen setState() dong thoi 2 lan vi co the xay ra loi
    // if(value ===''){
    //   this.setState({
    //     errors: {...this.state.errors, [name]: 'error'}
    //   })
    // }else{
    //   this.setState({
    //     errors: {...this.state.errors, [name]: ''}
    //   })
    // }
  };
  handleSubmit = (e) => {
    //prevent the page from being loaded
    e.preventDefault();
    //submit action
    let valid = true;
    let { values, errors } = this.state;
    let errorContent = "";
    let successContent ='';
    for (let key in values) {
      if (values[key] === "") {
        valid = false;
        errorContent += `<p class="w3-text-red text-left"> <b>${key} </b>  is invalid </p> `;
      }
      successContent +=`<p class="w3-text-green text-left"> <b>${key}: </b> ${values[key]} </p> `;
    }
    for (let key in errors) {
      if (errors[key] !== "") {
        valid = false;
        errorContent += `<p class="w3-text-red text-left"> <b>${key} </b>  is invalid </p> `;
      }
    }
    if (!valid) {
      Swal.fire({
        title: "Error!",
        html: errorContent,
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        html: successContent,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };
  render() {
    return (
      <div className="container d-flex justify-content-center">
        <form
          action="/action_page.php"
          className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin w-50"
        >
          <h2 className="w3-center">Contact Us</h2>
          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-user" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="firstName"
                type="text"
                placeholder="First Name"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.firstName}
              />
              <span className="text-danger text">
                {this.state.errors.firstName}
              </span>
            </div>
          </div>
          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-user" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.lastName}
              />
              <span className="text-danger text">
                {this.state.errors.lastName}
              </span>
            </div>
          </div>
          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-user" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="userName"
                type="text"
                placeholder="UserName"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.userName}
              />
              <span className="text-danger text">
                {this.state.errors.userName}
              </span>
            </div>
          </div>
          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-envelope-o" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.email}
              />
              <span className="text-danger text">
                {this.state.errors.email}
              </span>
            </div>
          </div>

          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-key" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.password}
              />
              <span className="text-danger text">
                {this.state.errors.password}
              </span>
            </div>
          </div>
          <div className="w3-row w3-section">
            <div className="w3-col" style={{ width: 50 }}>
              <i className="w3-xxlarge fa fa-key" />
            </div>
            <div className="w3-rest">
              <input
                className="w3-input w3-border"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                onChange={this.handleChangeValue}
                value={this.state.values.confirmPassword}
              />
              <span className="text-danger text">
                {this.state.errors.confirmPassword}
              </span>
            </div>
          </div>
          <button
            type="submit"
            onClick={(event) => {
              this.handleSubmit(event);
            }}
            className="w3-button w3-block w3-section w3-blue w3-ripple w3-padding"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
