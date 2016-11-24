import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GitHubSearch from '../components/GitHubSearch';
import * as gitHubActions from '../actions/gitHub';
import StackOverflowSearch from '../components/StackOverflowSearch';
import * as stackOverflowActions from '../actions/stackOverflow';

class App extends Component{

	render(){
		const {dispatch, gitHubProps, stackOverflowProps} = this.props;
		return (
			<div>
		      <GitHubSearch
		      	keyword={gitHubProps.keyword} 
		      	loading={gitHubProps.loading} 
		      	items={gitHubProps.items} 
		      	onInputChange={(keyword) => {dispatch(gitHubActions.gitHubInputChange(keyword))}} 
		      	onSearch={(keyword) => {dispatch(gitHubActions.gitHubFetchData(keyword))}} 
		      />
		      <StackOverflowSearch
		      	keyword={stackOverflowProps.keyword} 
		      	loading={stackOverflowProps.loading} 
		      	items={stackOverflowProps.items} 
		      	onInputChange={(keyword) => {dispatch(stackOverflowActions.stackOverflowInputChange(keyword));}} 
		      	onSearch={(keyword) => dispatch(stackOverflowActions.stackOverflowFetchData(keyword))} 
		      />
		    </div>
		);
	}
}

function select(state){
	return {
		gitHubProps: {
			...state.gitHub
		},
		stackOverflowProps: {
			...state.stackOverflow
		}
	};
}

export default connect(select)(App);