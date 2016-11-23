import React, {Component, PropTypes} from 'react';

class RepoItem extends Component{
	render(){
		return (
			<li>
				<a target="blank" href={this.props.url}>{this.props.name}</a>
			</li>
		);
	}
}

export default RepoItem;