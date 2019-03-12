import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import {countryCodes} from '../../asserts/CounrtyCodes'
import axios from 'axios'


class Signup extends Component {


    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            surName: '',
            email: '',
            contactNo: '',
            firstNameRequired: false,
            surnameRequired: false,
            emailRequired: false,
            emailInvalid: false,
            contactNumberRequired: false,
            contactNumberInvalid: false,
            countryCode: '',
            ip: ''

        }
    }

    componentDidMount() {


        axios.get('https://api.ipify.org?format=json')
            .then(response => {
                console.log(response.data)
                this.setState({ip: response.data.ip}, () => {
                    axios.get(`https://ipapi.co/${this.state.ip}/country_calling_code/`)
                        .then(response => {
                            console.log(response.data)
                            this.setState({countryCode: response.data})

                        })
                })

            })
    }


    handleFirstNameChange = (event) => {
        this.setState({firstName: event.target.value.trim()}, () => {
            this.validateFirstName()
        })
    };

    validateFirstName = () => {
        if (this.state.firstName === '') {
            this.setState({firstNameRequired: true})
        } else {
            this.setState({firstNameRequired: false})
        }
    };

    handleSurNameChange = (event) => {
        this.setState({surName: event.target.value.trim()}, () => {
            this.validateSurname()
        })
    };

    validateSurname = () => {
        if (this.state.surName === '') {
            this.setState({surnameRequired: true})
        } else {
            this.setState({surnameRequired: false})
        }
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value.trim()}, () => {
            this.validateEmail()
        })
    };

    validateEmail = () => {
        this.setState({emailRequired: false});
        this.setState({emailInvalid: false});

        if (this.state.email === '') {
            this.setState({emailRequired: true})
        } else {
            // eslint-disable-next-line
            if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
                this.setState({emailInvalid: true})
            }
        }
    };

    handleContactNoChange = (event) => {
        this.setState({contactNo: event.target.value.trim()}, () => {
            this.validateContactNumber()
        })
    };

    validateContactNumber = () => {
        this.setState({contactNumberRequired: false});
        this.setState({contactNumberInvalid: false});

        if (this.state.contactNo === '') {
            this.setState({contactNumberRequired: true})
        } else {
            if (!/^\d+$/.test(this.state.contactNo)) {
                this.setState({contactNumberInvalid: true})
            }

        }
    };

    submitForm = async () => {
        await this.validateFirstName();
        await this.validateSurname();
        await this.validateEmail();
        await this.validateContactNumber();


        console.log('validated')
    }


    render() {
        return (
            <div>
                {/*<Modal open={true} closeOnOverlayClick={true} center>*/}
                {/*<h2>Simple centered modal</h2>*/}
                {/*</Modal>*/}
                <div className="container" style={{paddingTop: '12%'}}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6 p-4"
                             style={{boxShadow: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)'}}>
                            <h3 className="text-center">Sign Up</h3>
                            <div className="px-5 py-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>

                                    <input type="text" className="form-control"
                                           placeholder="First Name" value={this.state.firstName}
                                           onChange={this.handleFirstNameChange}/>
                                </div>
                                {this.state.firstNameRequired ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>First name is
                                        required</p> : null}
                            </div>
                            <div className="px-5 py-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control"
                                           placeholder="Surname" value={this.state.surName}
                                           onChange={this.handleSurNameChange}/>
                                </div>
                                {this.state.surnameRequired ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>Surname is
                                        required</p> : null}

                            </div>
                            <div className="px-5 py-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                    <input type="text" className="form-control"
                                           placeholder="Email Address" value={this.state.email}
                                           onChange={this.handleEmailChange}/>
                                </div>
                                {this.state.emailRequired ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>Email is
                                        required</p> : null}
                                {this.state.emailInvalid ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>Email is
                                        invalid</p> : null}
                            </div>
                            <div className="px-5 py-2">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fas fa-phone"></i>
                                        </span>
                                    </div>
                                    <div className="input-group-prepend">
                                        <select className="form-control" style={{borderRadius: 0}}
                                                value={this.state.countryCode} onChange={(e) => {
                                            this.setState({countryCode: e.target.value})
                                        }}
                                        >
                                            {countryCodes.map(countryCode =>
                                                <option>{countryCode.dial_code}</option>
                                            )}

                                        </select>
                                    </div>

                                    <input type="text" className="form-control"
                                           placeholder="ContactNo" value={this.state.contactNo}
                                           onChange={this.handleContactNoChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">validate</span>
                                    </div>
                                </div>
                                {this.state.contactNumberRequired ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>Contact
                                        number is
                                        required</p> : null}
                                {this.state.contactNumberInvalid ?
                                    <p className="text-danger" style={{marginBottom: 0, fontSize: '13px'}}>Contact
                                        number is
                                        invalid</p> : null}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info" onClick={this.submitForm}>
                                    Signup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
