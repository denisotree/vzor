import React from "react";
import axios from "axios";

class PagesDetailView extends React.Component {
    state = {
        page: []
    };

    fetchPage = page => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/pages/${page}/`).then(res => {
            this.setState({
                page: res.data
            });
        });
    };

    componentDidMount() {
        this.fetchPage(this.props.match.params.page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page !== this.state.page) {
            this.fetchPage(nextProps.match.params.page)
        }
    }

    render() {
        return (
            <div style={{padding: '0 26px'}}>
                <h1 style={{marginBottom: '1rem'}}>
                    {this.state.page.title}
                </h1>

            </div>
        );
    }
}

export default PagesDetailView;
