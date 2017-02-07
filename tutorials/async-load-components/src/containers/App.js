import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as asyncLoadComponentsStatusActions from '../actions/asyncLoadComponentsStatus';
import * as gitHubActions from '../actions/gitHub';
import * as stackOverflowActions from '../actions/stackOverflow';
// import GitHubSearch from '../components/GitHubSearch';
// import StackOverflowSearch from '../components/StackOverflowSearch';

class App extends Component{

	constructor(props){
		super(props);
		this.btnLoadGitHubSearchClicked = this.btnLoadGitHubSearchClicked.bind(this);
		this.btnLoadStackOverflowSearchClicked = this.btnLoadStackOverflowSearchClicked.bind(this);
	}

	btnLoadGitHubSearchClicked(){
		this.props.onLoadGitHubSearch();
	}

	btnLoadStackOverflowSearchClicked(){
		this.props.onLoadStackOverflowSearch();
	}

	render(){
		const {
			asyncLoadComponentsStatus,

			gitHubProps,
			onGitHubInputChange,
			onGitHubSearch,

			stackOverflowProps,
			onStackOverflowInputChange,
			onStackOverflowSearch
		} = this.props;

		const GitHubSearch = asyncLoadComponentsStatus.GitHubSearch.componentClass;
		const StackOverflowSearch = asyncLoadComponentsStatus.StackOverflowSearch.componentClass;

		// return (
		// 	<div>
		//       <GitHubSearch
		//       	keyword = {gitHubProps.keyword}
		//       	loading = {gitHubProps.loading}
		//       	items = {gitHubProps.items}
		//       	onInputChange = {onGitHubInputChange}
		//       	onSearch = {onGitHubSearch}
		//       />
		//       <StackOverflowSearch
		//       	keyword = {stackOverflowProps.keyword}
		//       	loading = {stackOverflowProps.loading}
		//       	items = {stackOverflowProps.items}
		//       	onInputChange = {onStackOverflowInputChange}
		//       	onSearch = {onStackOverflowSearch}
		//       />
		//     </div>
		// );

		return (
			<div>
				{
					GitHubSearch ?  <GitHubSearch
										      	keyword = {gitHubProps.keyword}
										      	loading = {gitHubProps.loading}
										      	items = {gitHubProps.items}
										      	onInputChange = {onGitHubInputChange}
										      	onSearch = {onGitHubSearch}
										      /> : <button onClick={this.btnLoadGitHubSearchClicked}>load GitHubSearch component dynamically</button>
				}
				{
					StackOverflowSearch ? <StackOverflowSearch
													      	keyword = {stackOverflowProps.keyword}
													      	loading = {stackOverflowProps.loading}
													      	items = {stackOverflowProps.items}
													      	onInputChange = {onStackOverflowInputChange}
													      	onSearch = {onStackOverflowSearch}
													      /> : <button onClick={this.btnLoadStackOverflowSearchClicked}>load StackOverflowSearch component dynamically</button>
				}
			</div>
		);
	}
}

//将state映射到UI组件GitHubSearch和StackOverflowSearch的props参数
function mapStateToProps(state){
	return {
		asyncLoadComponentsStatus: {
			...state.asyncLoadComponentsStatus
		},
		gitHubProps: {
			...state.gitHub
		},
		stackOverflowProps: {
			...state.stackOverflow
		}
	};
}

//将UI组件GitHubSearch和StackOverflowSearch的操作映射成dispatch相应的action
//此处的mapDispatchToProps是一个function，key是UI组件的回调参数名，value是一个函数，用于dispatch相应的action
function mapDispatchToProps(dispatch){
	return {
		onLoadGitHubSearch: () => dispatch(asyncLoadComponentsStatusActions.asyncLoadComponentGitHubSearch()),
		onLoadStackOverflowSearch: () => dispatch(asyncLoadComponentsStatusActions.asyncLoadComponentStackOverflowSearch()),
		onGitHubInputChange: (keyword) => dispatch(gitHubActions.gitHubInputChange(keyword)),
		onGitHubSearch: (keyword) => dispatch(gitHubActions.gitHubFetchData(keyword)),
		onStackOverflowInputChange: (keyword) => dispatch(stackOverflowActions.stackOverflowInputChange(keyword)),
		onStackOverflowSearch: (keyword) => dispatch(stackOverflowActions.stackOverflowFetchData(keyword))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);