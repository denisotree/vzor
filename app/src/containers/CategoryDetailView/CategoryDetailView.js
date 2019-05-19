import React from "react";
import axios from "axios";
import VideoList from "../../components/VideoList/VideoList";

class CategoryDetail extends React.Component {
    state = {
        category: [],
        video: []
    };

    fetchCategory = () => {
        const category = this.props.match.params.category;
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/category/${category}/`)
            .then(res => {
                this.setState({
                    category: res.data
                });
                const catID = res.data.id;
                axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/video/`, {
                    params: {
                        status: 'published',
                        category: catID
                    }
                })
                    .then(res => {
                        this.setState({
                            video: res.data
                        });
                    });
            });
    };

    componentDidMount() {
        this.fetchCategory();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            this.fetchCategory();
        }
    }

    render() {
        return (
            <div style={{padding: '0 26px'}}>
                <h1 style={{marginBottom: '1rem'}}>
                    {this.state.category.title}
                </h1>
                <VideoList data={this.state.video}/> <br/>
            </div>
        );
    }
}

export default CategoryDetail;
