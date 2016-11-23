import React, {Component} from 'react';

class GitHubSearch extends Component{

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
    const {keyword, items} = this.props;
    return (
      <div className="github-search">
        <div>
          <input value={this.props.keyword} ref={dom => this.input = dom} onChange={this.inputChanged} type="text" className="keyword-input" />
          <button onClick={this.searchButtonClicked} className="search-btn">Search</button>
        </div>
        <ul></ul>
      </div>
    );
  }

}

export default GitHubSearch;