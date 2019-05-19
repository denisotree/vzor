import React from 'react';
import axios from "axios";

import ImagesList from '../../components/ImagesList'

class Home extends React.Component {

    state = {
        category: []
    };

    fetchCategory = () => {
        axios.get(`${window.location.protocol}//${window.location.hostname}:8000/api/v1/category/`).then(res => {
          this.setState({
            category: res.data
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
            <div>
                <h3>Выберите категорию</h3>
                <ImagesList
                    data={this.state.category}
                    path="categories"
                />
            </div>
        )
    }
}

export default Home;