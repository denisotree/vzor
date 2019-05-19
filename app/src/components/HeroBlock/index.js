import React from "react";

import './style.scss';

class HeroBlock extends React.Component {

    render() {
        return (
            <div className="hero__wrapper">
                {
                    this.props.type === "video" ?
                        <div className="hero__video hide-small">
                            <div className="hero__video-wrapper" itemType="http://schema.org/VideoObject">
                                <video preload="none"
                                       poster={this.props.image}
                                       muted="muted"
                                       autoPlay="autoplay"
                                       loop="loop">
                                    <source src={this.props.videoUrl} type="video/mp4"/>
                                </video>
                            </div>
                            <div className="hero__title">
                                    <h1>VZOR.SPACE</h1>
                                    <h2>Расширь свой взор</h2>
                            </div>
                        </div>
                        :
                        <div className="hero__image hide-small">
                            <div className="hero__image-wrapper" style={{background: `url(${this.props.image})`}}/>
                            <div className="hero__title">
                                    <h1>VZOR.SPACE</h1>
                                    <h2>Расширь свой взор</h2>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default HeroBlock;