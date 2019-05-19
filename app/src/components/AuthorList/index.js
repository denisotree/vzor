import React from "react";

import {Link} from 'react-router-dom';

import {List, Avatar} from "antd";

import "./style.scss"

class AuthorList extends React.Component {

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
                renderItem={author => (
                    <List.Item>
                        <Link className="author__item" to={"/authors/" + author.username + "/"}>
                            <Avatar
                                className="author__avatar"
                                size={150}
                                src={
                                    author.avatar ?
                                        author.avatar
                                        :
                                        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
                            />
                            <span className="author__name">
                                {author.username}
                             </span>
                        </Link>
                    </List.Item>
                )}
            />
        );
    }
}

export default AuthorList;