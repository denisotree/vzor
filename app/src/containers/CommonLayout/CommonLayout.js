import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Layout, Avatar} from 'antd';
import axios from "axios";

import HeroBlock from "../../components/HeroBlock";
import SearchBlock from "../../components/SearchBlock/SearchBlock"

import './style.scss';

const {Header, Content, Footer} = Layout;

class CommonLayout extends Component {

    state = {
        pages: [],
    };

    fetchMenu = () => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/pages/`).then(res => {
            this.setState({
                pages: res.data
            });
        });
    };

    generateMenu = () => {
        const pages = this.state.pages;
        const menuList = pages.map((item) =>
            <li className="header__menu-item" key={item.slug}>
                <NavLink to={"/" + item.slug + "/"} activeClassName="selected">{item.title}</NavLink>
            </li>
        );
        return menuList;
    };

    cleanSearchQuery = () => {
        this.props.updateSearchRequest(null);
        this.props.fetchVideo({status: "published"})
    };

    componentWillMount() {
        this.fetchMenu();
    }

    render() {

        const year = 2019;

        const generatedMenu = this.generateMenu();

        return (
            <Layout className="layout">
                <Header>
                    <div className="header__logo">
                        <Link to="/">
                            Vzor truestock
                        </Link>
                    </div>
                    <ul className="header__menu">
                        <li className="header__menu-item" key="video">
                            <NavLink to={"/video/"} activeClassName="selected">Видео</NavLink>
                        </li>
                        {generatedMenu}
                    </ul>
                    <ul className="header__menu">

                        {
                            this.props.isAuthenticated ?

                                <li className="header__menu-item">
                                    <Link to={"/dashboard/" + this.props.username}>
                                        <Avatar src={
                                            this.props.currentUser.avatar ?
                                                this.props.currentUser.avatar
                                                :
                                                "https://s3.eu-central-1.amazonaws.com/vzor-space/zero_avatar.png"
                                        }
                                        />
                                    </Link>
                                </li>

                                :

                                <li className="header__menu-item">
                                    <Link to="/login/">Войти</Link>
                                </li>

                        }
                    </ul>
                </Header>
                <SearchBlock {...this.props}/>
                {
                    this.props.location.pathname === '/' &&
                    <HeroBlock
                        type="video"
                        image="https://s3.eu-central-1.amazonaws.com/vzor-space/hero_video_thumb.jpg"
                        videoUrl="https://s3.eu-central-1.amazonaws.com/vzor-space/hero_video.mp4"
                    />
                }
                <Content style={{padding: '3rem'}}>
                    {this.props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    VZOR SPACE {year}{year === (new Date()).getFullYear() || ' - ' + (new Date()).getFullYear()}
                </Footer>
            </Layout>
        )
    }
}

export default withRouter(CommonLayout);