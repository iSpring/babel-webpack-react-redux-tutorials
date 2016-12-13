import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GitHubSearch from '../components/GitHubSearch';
import * as gitHubActions from '../actions/gitHub';
import StackOverflowSearch from '../components/StackOverflowSearch';
import * as stackOverflowActions from '../actions/stackOverflow';

class App extends Component{

	render(){
		//gitHubProps和stackOverflowProps是通过mapStateToProps()和connect()方法注入进来的
		//onGitHubInputChange、onGitHubSearch、onStackOverflowInputChange和onStackOverflowSearch是通过mapDispatchToProps()和connect()方法注入进来的
		const {
			gitHubProps,
			onGitHubInputChange,
			onGitHubSearch,

			stackOverflowProps,
			onStackOverflowInputChange,
			onStackOverflowSearch
		} = this.props;

		return (
			<div>
		      <GitHubSearch
		      	keyword = {gitHubProps.keyword}
		      	loading = {gitHubProps.loading}
		      	items = {gitHubProps.items}
		      	onInputChange = {onGitHubInputChange}
		      	onSearch = {onGitHubSearch}
		      />
		      <StackOverflowSearch
		      	keyword = {stackOverflowProps.keyword}
		      	loading = {stackOverflowProps.loading}
		      	items = {stackOverflowProps.items}
		      	onInputChange = {onStackOverflowInputChange}
		      	onSearch = {onStackOverflowSearch}
		      />
		    </div>
		);
	}
}

//将state映射到UI组件GitHubSearch和StackOverflowSearch的props参数
function mapStateToProps(state){
	return {
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
		onGitHubInputChange: (keyword) => dispatch(gitHubActions.gitHubInputChange(keyword)),
		onGitHubSearch: (keyword) => dispatch(gitHubActions.gitHubFetchData(keyword)),
		onStackOverflowInputChange: (keyword) => dispatch(stackOverflowActions.stackOverflowInputChange(keyword)),
		onStackOverflowSearch: (keyword) => dispatch(stackOverflowActions.stackOverflowFetchData(keyword))
	};
}

// 此处的mapDispatchToProps是一个Object对象，在功能上等价于上面的function，
// mapDispatchToProps的key对应的value值只负责返回action，react-redux自动进行dispatch
// const mapDispatchToProps = {
// 	onGitHubInputChange: (keyword) => gitHubActions.gitHubInputChange(keyword),
// 	onGitHubSearch: (keyword) => gitHubActions.gitHubFetchData(keyword),
// 	onStackOverflowInputChange: (keyword) => stackOverflowActions.stackOverflowInputChange(keyword),
// 	onStackOverflowSearch: (keyword) => stackOverflowActions.stackOverflowFetchData(keyword)
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);