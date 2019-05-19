import React from "react";

import {List} from "antd";
import CardImage  from '../CardImage/CardImage'

import "./style.scss"

class ImagesList extends React.Component {

    render() {
        return (
                <List
                    grid={{
                      gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6,
                    }}
                    dataSource={this.props.data}
                    renderItem={item => (
                      <List.Item>
                              <CardImage
                                type="image"
                                coverImage={item.thumbnail}
                                title={item.title}
                                link={this.props.path + '/' + item.slug}
                              />
                      </List.Item>
                    )}
                  />
        );
    }
}

export default ImagesList;