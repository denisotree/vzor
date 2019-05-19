import React from "react";

import {List} from "antd";
import CardVideo from "../CardVideo/CardVideo";

import "./style.scss"

class VideoList extends React.Component {

    state = {
        load: false
    };

    componentWillReceiveProps(nextProps) {
         this.setState({
             load: !this.state.load
         })

    }

    render() {
        return (
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 12
                    }}
                    dataSource={this.props.data}
                    grid={{
                        gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6,
                    }}
                    renderItem={item => (
                        <List.Item>
                            <div className="video">
                                <CardVideo
                                    type="video"
                                    preview={item.preview}
                                    image={item.thumbnail}
                                    title={item.title}
                                    link={'/video/' + item.slug}
                                />
                            </div>
                        </List.Item>
                    )}
                />
        );
    }
}

export default VideoList;