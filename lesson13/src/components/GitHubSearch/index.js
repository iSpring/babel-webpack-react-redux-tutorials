import React, {Component} from 'react';

class GitHubSearch extends Component{

  constructor(props){
    super(props);
    this.inputChanged = this.inputChanged.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
  }

  inputChanged(){
    var keyword = this.input.value;
    console.log(keyword);
  }

  searchButtonClicked(){
    var keyword = this.input.value;
    this.props.onSearch(keyword);
  }

  render(){
    const {keyword, items}
    return (
      <div className="github-search">
        <div>
          <input type="text" ref={dom => this.input = dom} onChange={this.inputChanged} />
          <button onClick={this.searchButtonClicked}>Search</button/>
        </div>
        <ul></ul>
      </div>
    );
  }

}

export default GitHubSearch;