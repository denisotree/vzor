import React from "react";
import { Link } from 'react-router-dom';

import './style.scss';

export default class CardVideo extends React.Component {

    getVideoRef = (el) => {
        this._videoEl = el
    };

    videoHoverPlay = () => {
        this._videoEl.play();
    };

    videoHoverPause = () => {
        this._videoEl.pause();
    };

    render() {
        return (
            <div className="cover">
                <Link to={this.props.link ? this.props.link + "/" : "#"}>
                    <div className="cover__block" onMouseOver={this.videoHoverPlay} onMouseOut={this.videoHoverPause}>
                        <div className="video__wrapper">
                            <video
                                ref={this.getVideoRef}
                                muted
                                preload="none"
                                poster={this.props.image}
                                loop>
                                <source src={this.props.preview}
                                        type="video/mp4"/>
                            </video>
                        </div>
                        <div className="cover__title-video">
                            <span>{this.props.title}</span>
                        </div>

                        <div className="cover__duration">

                        </div>

                    </div>
                </Link>
            </div>
        );
    }
}
