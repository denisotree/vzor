import React from "react";
import {connect} from 'react-redux';
import {PageHeader, Row, Col, Button} from "antd";
import {Link} from "react-router-dom";
import CardVideo from "../../components/CardVideo/CardVideo";
import axios from "axios";

import * as fetchActions from "../../store/actions/fetch";

class VideoDetail extends React.Component {

    state = {
        author: {}
    };

    getAuthorName = () => {
        if (this.state.author.first_name || this.state.author.last_name) {
            return this.state.author.first_name + ' ' + this.state.author.last_name
        } else {
            return this.props.videoData.author
        }
    };

    fetchAuthor = author => {
        axios.get(`${window.location.protocol}//${window.location.hostname}/api/v1/authors/${author}/`)
            .then(res => {
                    this.setState({
                        author: res.data
                    })
                }
            )
    };

    componentDidMount() {
        const video = this.props.match.params.video;
        this.props.fetchVideo(video);
        this.fetchAuthor(this.props.videoData.author)
    }

    render() {
        return (
            <div>
                <PageHeader
                    onBack={() => window.history.back()}
                    title={this.props.videoData.title}
                    style={{marginBottom: "2rem", boxShadow: "2px 2px 10px rgba(0, 0, 0, .05)"}}
                />
                <Row type="flex">
                    <Col span={12}>
                        <CardVideo
                            type="video"
                            preview={this.props.videoData.preview}
                            image={this.props.videoData.thumbnail}
                        />
                    </Col>
                    <Col span={12}>
                        <div className="video__info" style={{padding: "1rem 2rem"}}>
                            <h1>{this.props.videoData.title}</h1>
                            <p>Автор: <Link to={'/authors/' + this.props.videoData.author}>{this.getAuthorName()}</Link>
                            </p>
                            <p>{this.props.videoData.description}</p>
                            <p>Цена: {this.props.videoData.price}</p>
                            <Button type="primary" shape="round" icon="shopping-cart" size="large">Добавить в
                                корзину</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        videoData: state.videoData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideo: params => dispatch(fetchActions.fetchVideo(params))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
