import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Route, Redirect} from 'react-router-dom'
import {Form, Input, Checkbox, Button, Icon} from 'antd';

import * as actions from "../../store/actions/auth";

class Signup extends Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.first_name, values.second_name, values.password1, values.password2, values.email, values.phone);
            }
        });
        if (this.props.isAuthenticated) {
            this.props.history.push(`/dashboard/${this.props.currentUser}`)
        }
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password1')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
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

        const {getFieldDecorator} = this.props.form;

        return (
            <Route path="/" render={() => (
                this.props.isAuthenticated ? (
                    <Redirect to={`/dashboard/${this.props.username}`}/>
                ) : (
                    <div>
                        <h1 style={{width: "100%", textAlign: "center"}}>Регистрация</h1>
                        <div className="error__field">
                            {errorMessage}
                        </div>
                        <Form onSubmit={this.handleSubmit} style={{maxWidth: 600, margin: "auto"}}>
                            <Form.Item>
                                {getFieldDecorator('first_name', {
                                    rules: [{required: true, message: 'Введите имя', whitespace: true}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Имя"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('second_name', {
                                    rules: [{required: true, message: 'Введите фамилию', whitespace: true}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Фамилия"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Введите логин', whitespace: true}],
                                })(
                                    <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Логин"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: 'Вы ввели неверный e-mail',
                                    }, {
                                        required: true, message: 'Введите e-mail',
                                    }],
                                })(
                                    <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="E-mail"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('phone', {
                                    rules: [{required: true, message: 'Введите номер телефона'}],
                                })(
                                    <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           placeholder="Телефон"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password1', {
                                    rules: [{
                                        required: true, message: 'Введите пароль',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder="Пароль"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password2', {
                                    rules: [{
                                        required: true, message: 'Повторите пароль',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                           type="password"
                                           placeholder="Подтверждение пароля" onBlur={this.handleConfirmBlur}/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>Я прочитал и согласен с условиями <Link to="/policy/">Политики
                                        кофиденциальности и
                                        правилами сайта</Link></Checkbox>
                                )}
                            </Form.Item>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
                                <Link to="/login/">Войти</Link>
                            </div>
                        </Form>
                    </div>
                )
            )}/>
        );
    }
}

const WrappedSignup = Form.create({name: 'register'})(Signup);

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
        currentUser: state.currentUser,
        username: state.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, first_name, second_name, password1, password2, email, phone) => dispatch(actions.authSignup(username, first_name, second_name, password1, password2, email, phone))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSignup)