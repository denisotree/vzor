import React from "react";
import { connect } from 'react-redux';

import VideoList from "../../components/VideoList/VideoList"

import "./style.scss"

class VideoListView extends React.Component {

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

export default connect(mapStateToProps)(VideoListView);