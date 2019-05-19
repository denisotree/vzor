import React from 'react';
import {Avatar, Button, PageHeader, Row, Col} from "antd";
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import VideoList from "../VideoList/VideoList";
import * as authActions from "../../store/actions/auth";
import * as fetchActions from "../../store/actions/fetch";
import WrappedCommonForm from "../Form";

import './style.scss'

class DashboardContent extends React.Component {

    state = {
        addContentForm: false
    };

    getAuthorName = () => {
        if (this.props.currentUser.first_name || this.props.currentUser.last_name) {
            return this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name
        } else {
            return this.props.currentUser.username
        }
    };

    handleAdd = () => {
        this.setState({
            addContentForm: !this.state.addContentForm
        })
    };

    componentDidMount() {
        this.props.fetchVideo({status: 'published', author: this.props.currentUser.id});
        console.log(this.props.currentUser);
    }

    render() {
        return (
            <div className="dashboard__wrapper">
                <PageHeader
                    onBack={() => window.history.back()}
                    title="Личный кабинет"
                    extra={[
                        <Link key="edit" className="ant-btn ant-btn-primary"
                              to={this.props.currentUser.username + "/edit/"}>
                            Редактировать
                        </Link>,
                        <Button key="submit" htmlType="button" onClick={this.props.logout}>Выйти</Button>,
                    ]}
                    footer={
                        <div className="dashboard__video">
                            <h3>Загруженный контент</h3>
                            <div>Добавить новый
                                <button className="ant-btn dashboard__video-button" onClick={this.handleAdd}>
                                    +
                                </button>
                            </div>
                            <VideoList data={this.props.videoData}/>
                            {
                                this.state.addContentForm &&
                                <WrappedCommonForm class="padding-block"/>
                            }
                        </div>
                    }
                >
                    <div className="wrap">
                        <Row type="flex">
                            <Col>
                                <Avatar
                                    src={
                                        this.props.currentUser.avatar ?
                                            this.props.currentUser.avatar
                                            :
                                            "https://s3.eu-central-1.amazonaws.com/vzor-space/zero_avatar.png"
                                    }
                                    size={200}
                                />
                            </Col>
                            <Col>
                                <div className="dashboard__author-name">{this.getAuthorName()}</div>
                            </Col>
                        </Row>
                    </div>
                </PageHeader>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
        fetchVideo: params => dispatch(fetchActions.fetchVideos(params))
    }
};

const mapStateToProps = state => {
    return {
        videoData: state.videoData
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardContent))