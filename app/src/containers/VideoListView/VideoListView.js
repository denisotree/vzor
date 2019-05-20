import React from "react";
import {connect} from 'react-redux';

import VideoList from "../../components/VideoList/VideoList"

import "./style.scss"

import * as fetchActions from "../../store/actions/fetch";

class VideoListView extends React.Component {

    componentDidMount() {
        this.props.fetchVideos({status: "published"})
    }

    render() {
        return (
            <div style={{padding: '0 2rem'}}>
                <h1>
                    Видео
                </h1>
                <VideoList data={this.props.videoData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        videoData: state.videoData,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideos: (params) => dispatch(fetchActions.fetchVideos(params))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListView);