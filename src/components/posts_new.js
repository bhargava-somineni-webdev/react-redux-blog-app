import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {
        //field param is responsible for linking the Field component to the jsx rendered by this function
        //this field param makes Field component aware of the changes being made on the jsx (input tag here)
        //in the browser
        const { meta: { touched, error } } = field;
        //above we are trying to access field.meta.touched and field.meta.error
        //touched and error do not get expanded as {touched:touched, error: error}
        //because normally we expect {touched} as {touched: touched} with ES6 syntax
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input} //field.input has a bunch of different event handlers and
                    //bunch of different props. For eg: onblur, onchange, onfocus events
                    //and props like value of the input
                    //by using {...field.input}, we are making all the properties of field.input object
                    //available as props(on field object) to the input tag. For eg: we are sending title and name from Field
                    //and they are available on field.label and field.name
                />
                <div className="text-help"> {/*text-help works along with has-danger class
                                            and shows error in red color*/}
                    {touched ? error : ''} {/*we show error only 
                    when the field is in touched state. Without checking for touched state,
                    the error is shown even the first time the field is loaded
                    in the webpage*/}
                </div>

            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props; //reduxForm provides handleSubmit as props to the component
        //same as const handleSubmit = this.props.handleSubmit
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> {/*handleSubmit is passed 
                an onSubmit helper function, which we defined above. When form is submitted, handleSubmit
                function is called first, which handles the redux side of the form
                that is validating, error display, etc. After the form is valid, the onSubmit callback is called
                where we send our data to the backend server, to save it, etc */}
                <Field
                    label="Title" //sometimes label and name can be different, hence we are using both label
                    //and name props on Field
                    name="title"
                    component={this.renderField} //you can have a different function instead of renderField
                    //since all the Field components render similar jsx, 
                    //we are using a general renderField function
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    //values holds the input of all the fields, the user entered at the time of form submit
    //an object with Field 'name' as key and user input value as property
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title"; //this error is later available on field.meta.error
        //on the respective field
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate, //validate is passed as configuration option to reduxForm helper
    //whenever the form is submitted by button or enter key, validate gets called automatically
    form: 'PostsNewForm' //Name of form. Keep this unique 
    //or else other form with same name will share this form's state and vice versa
})(
    connect(null, { createPost })(PostsNew)
    ); //we have linked both connect and reduxForm helpers to our PostsNew component
    //connect helper used to connect the action creator 'createPost' with PostsNew react component
    //Notice, here we used action creator shortcut as second parameter to connect, instead of mapDispatchToProps