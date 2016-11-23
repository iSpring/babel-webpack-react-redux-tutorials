import React, {Component, PropTypes} from 'react';
import './index.css';

class GitHubSearch extends Component{

  static propTypes : {
    keyword: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }

  constructor(props){
    super(props);
    this.inputChanged = this.inputChanged.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
  }

  inputChanged(){
    var keyword = this.input.value;
    this.props.onInputChange(keyword);
  }

  searchButtonClicked(){
    var keyword = this.input.value;
    this.props.onSearch(keyword);
  }

  render(){
    const {keyword, loading, items} = this.props;
    console.log("render items", items);
    return (
      <div className="github-search">
        <div className="input-section">
          <input value={this.props.keyword} ref={dom => this.input = dom} onChange={this.inputChanged} type="text" className="keyword-input" />
          <button onClick={this.searchButtonClicked} className="search-btn">Search</button>
        </div>
        {
          !loading && <ul>items</ul>
        }
        {
          loading && <div className="loading">Loading...</div>
        }
      </div>
    );
  }

}

export default GitHubSearch;