import React from "react";
import axios from "axios";

import AuthorList from "../../components/AuthorList"

export default class AuthorListView extends React.Component {
    state = {
        video: []
    };

    fetchVideo = () => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/authors/`).then(res => {
            this.setState({
                video: res.data
            });
        });
    };

    componentDidMount() {
        this.fetchVideo();
    }

    render() {
        return (
            <div style={{padding: '0 2rem'}}>
                <h1>
                    Авторы VZOR SPACE
                </h1>
                <AuthorList data={this.state.video} />
            </div>
        );
    }
}