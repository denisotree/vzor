import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
import {connect} from 'react-redux';
import {Link, Route, Redirect} from 'react-router-dom';

import * as actions from "../../store/actions/auth";

class Login extends Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.password);
            }
        });
    };

    render() {

        let errorMessage = null;
        if (this.props.error) {
            switch (this.props.error.response.status) {
                case 400:
                    errorMessage = "Введены неверные логин или пароль";
                    break;
                case 404:
                    errorMessage = "Невозможно установить соединение с сервером";
                    break;
                default:
                    errorMessage = "Произошла неизвестная ошибка";
                    break;
            }
        }

        const spinIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
        const {getFieldDecorator} = this.props.form;
        return (
            <Route path="/" render={() => (
                this.props.isAuthenticated ? (
                    <Redirect to={`/dashboard/${this.props.username}`}/>
                ) : (
                    <div>
                        <h1 style={{width: "100%", textAlign: "center"}}>Вход</h1>
                        <div className="error__field">
                            {errorMessage}
                        </div>

                        {
                            this.props.loading ?

                                <Spin indicator={spinIcon}/>

                                :

                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: 'Please input your username!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Username"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please input your Password!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   type="password"
                                                   placeholder="Password"/>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: false,
                                        })(
                                            <Checkbox>Remember me</Checkbox>
                                        )}
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}>
                                        <Link style={{alignSelf: "flex-start"}} className="login-form-forgot" to="">Забыли
                                            пароль?</Link>
                                        <Link style={{alignSelf: "flex-end"}} to="/signup/">Зарегистрироваться</Link>
                                    </div>
                                </Form>

                        }
                    </div>
                )
            )}/>
        );
    }
}

const WrappedLogin = Form.create()(Login);

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        loading: state.loading,
        error: state.error,
        username: state.username,
        currentUser: state.currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLogin)