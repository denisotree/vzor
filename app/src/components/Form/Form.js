import React from 'react';
import {slugify} from 'transliteration';
import axios from 'axios';
import {
    Form, Button, Upload, Icon, Input, Select, InputNumber
} from 'antd';
import {connect} from 'react-redux';

const {TextArea} = Input;

const {Option} = Select;

class CommonForm extends React.Component {

    state = {
        slug: '',
        category: [],
    };

    fetchCategory = () => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/category/`).then(res => {
            this.setState({
                category: res.data
            });
        });
    };

    handleTitleChange = (e) => {
        this.props.form.setFieldsValue({
            slug: slugify(e.target.value)
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.token);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const postObj = {
                    title: values.title,
                    slug: values.slug,
                    description: values.description,
                    price: values.price,
                    author: this.props.userID,
                    thumbnail: e.target.elements.thumbnail.value,
                    category: 1
                };

                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                axios.defaults.xsrfCookieName = "csrftoken";
                axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: `Token ${this.props.token}`,
                };
                console.log(postObj);
                axios.post(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/video/create/`, postObj)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });
    };

    generateCategoryList = () => {
        const category = this.state.category;
        const categoryList = category.map((item) =>
            <Option key={item.id} value={item.id}>{item.title}</Option>
        );
        return categoryList;
    };

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    componentDidMount() {
        this.fetchCategory();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className={this.props.class}>
                <Form.Item>
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true,
                            message: 'Пожалуйста, введите название видео',
                        }],
                    })(
                        <Input placeholder="Введите название видео"
                               onChange={this.handleTitleChange}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('slug', {
                        rules: [{
                            required: true,
                        }],
                    })(
                        <Input placeholder="Слаг видео"/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('price', {
                        rules: [{
                            required: true,
                            message: 'Пожалуйста, введите цену видео',
                        }],
                    })(
                        <InputNumber
                            defaultValue={5000}
                            style={{width: "100%"}}
                        />
                    )}
                </Form.Item>
                <Form.Item label="Описание">
                    {getFieldDecorator('description', {
                        rules: [{
                            required: false,
                            message: 'Пожалуйста, введите название видео',
                        }],
                    })(
                        <TextArea rows={4}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('category', {
                        rules: [
                            {required: true, message: 'Выберите категорию'},
                        ],
                    })(
                        <Select placeholder="Категория">
                            {this.generateCategoryList()}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Миниатюра">
                    <div className="dropbox">
                        {getFieldDecorator('thumbnail', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload name="thumbnail">
                                <Button>
                                    <Icon type="upload"/> Нажмите для загрузки
                                </Button>
                            </Upload>
                        )}
                    </div>
                </Form.Item>

                <Form.Item label="Миниатюра">
                    <input type="file" name="thumbnail"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">Загрузить</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedCommonForm = Form.create({name: 'validate_other'})(CommonForm);

const mapStateToProps = state => {
    return {
        userID: state.currentUser.id,
        token: state.token,
    }
};

export default connect(mapStateToProps)(WrappedCommonForm);