// src/UserForm.js
import React, { Component } from 'react';
import { Form } from 'react-router-dom';

class UserForm extends Component {
    initialState = {
        name: "",
        job: ""
    };
    state = this.initialState;
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };
    submitForm = () => {
        // this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    };
    render() {
        const { name, job } = this.state;
        return (
            <Form method='post' id="user-form" onSubmit={this.submitForm}>
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={this.handleChange}
                />
                <label htmlFor='job'>Job</label>
                <input
                    type="text"
                    name="job"
                    id="job"
                    value={job}
                    onChange={this.handleChange}
                />
                {/* <input type="button" value="Submit" onClick={this.submitForm} /> */}
                <input type="submit" value="Submit" />
            </Form>
        );
    }
}

export default UserForm;