import React from "react";
import {Input, Select} from 'antd';
import {connect} from 'react-redux';
import queryString from 'query-string';

import * as searchActions from '../../store/actions/search'

import './styles.scss';
import * as fetchActions from "../../store/actions/fetch";

const Option = Select.Option;
const Search = Input.Search;

class SearchBlock extends React.Component {

    state = {
        searchType: "video",
    };

    handleChange = value => {
        this.setState({
            searchType: value
        });
    };

    handleSearch = value => {
        this.props.history.push(`/${this.state.searchType}/?search=${value}`);
        this.props.updateSearchRequest(value);
        this.props.fetchVideo({status: 'published', search: value});
    };

    componentDidMount() {
       if (this.props.searchQuery == null && this.props.location.search !== "") {
            this.props.updateSearchRequest(queryString.parse(this.props.location.search).search);
            this.props.fetchVideo({status: 'published', search: queryString.parse(this.props.location.search).search});
        }
    }

    render() {
        return (
            <div>
                <div className="header__search">
                    <Select defaultValue="video" size="large" style={{width: 200, marginRight: '1rem'}}
                            onChange={this.handleChange}>
                        <Option value="video">Видео</Option>
                        <Option value="audio" disabled>Аудио</Option>
                        <Option value="images" disabled>Изображения</Option>
                    </Select>
                    <Search
                        placeholder="Найди футаж своей мечты"
                        enterButton
                        size="large"
                        onSearch={this.handleSearch}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchQuery: state.searchQuery,
        videoData: state.videoData,
    }
};

const mapDispatchToProps = dispatch => {
  return {
      updateSearchRequest: searchQuery => dispatch(searchActions.updateSearchRequest(searchQuery)),
      fetchVideo: (params) => dispatch(fetchActions.fetchVideos(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlock);