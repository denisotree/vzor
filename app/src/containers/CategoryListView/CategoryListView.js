import React from 'react';
import axios from "axios"
import ImagesList  from '../../components/ImagesList'

class CategoryListView extends React.Component {

    state = {
        category: []
    };

    fetchCategory = () => {
        axios.get(`${window.location.protocol}//${window.location.hostname}/api/v1/category/`).then(res => {
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
                <h1>Категории</h1>
                <ImagesList
                    data={this.state.category}
                    path="categories"
                />
            </div>
        )
    }
}

export default CategoryListView;