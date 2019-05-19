import React from "react";
import { Link } from "react-router-dom";

import './style.scss';


export default class CardImage extends React.Component {

    render() {
        return (
            <div className="card">
                <Link to={this.props.link ? this.props.link + "/" : "#"}>
                    <div className="card__image">
                        <div className="card__image-wrapper">
                            <img src={this.props.coverImage} alt="" className="cover-image"/>
                        </div>
                        <div className="card__title">
                            <span>{this.props.title}</span>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}