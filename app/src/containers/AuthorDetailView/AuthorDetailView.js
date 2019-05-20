import React from "react";
import axios from "axios";
import VideoList from "../../components/VideoList/VideoList";

import {Avatar} from "antd";

import "./style.scss"

export default class AuthorDetailView extends React.Component {
    state = {
        author: [],
        video: []
    };

    fetchAuthor = () => {
        const author = this.props.match.params.author;
        axios.get(`${window.location.protocol}//${window.location.hostname}/api/v1/authors/${author}`)
            .then(res => {
                this.setState({
                    author: res.data
                });
                const authorID = res.data.id;
                axios.get(`${window.location.protocol}//${window.location.hostname}/api/v1/video`, {
                    params: {
                        author: authorID,
                        status: 'published'
                    }
                })
                    .then(res => {
                        this.setState({
                            video: res.data
                        });
                    });
            });
    };

    getAuthorName = () => {
        if (this.state.author.first_name || this.state.author.last_name) {
            return this.state.author.first_name + ' ' + this.state.author.last_name
        } else {
            return this.state.author.username
        }
    };

    componentWillMount() {
        this.fetchAuthor();
    }

    render() {

        return (
            <div style={{padding: '0 26px'}}>
                <div className="author__detail-data">
                    <div className="author__detail-avatar">
                        <Avatar
                            size={150}
                            src={
                                this.state.author.avatar ?
                                    this.state.author.avatar
                                    :
                                    "https://s3.eu-central-1.amazonaws.com/vzor-space/zero_avatar.png"}
                        />
                    </div>
                    <div className="author__detail-info">
                        <h1>
                            {this.getAuthorName()}
                        </h1>
                    </div>
                </div>
                <VideoList data={this.state.video}/> <br/>
            </div>
        );
    }
}