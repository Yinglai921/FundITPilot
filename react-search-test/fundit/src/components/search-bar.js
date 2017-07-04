import React, { Component } from 'react';

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            term: ''
        }
    }

    render(){
        return (
            <div className="col-md-12 search-bar">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Search in titles</label>
                        <div className="col-sm-10">
                            <input 
                                type="search" 
                                className="form-control" 
                                value={this.state.term}
                                onChange={event => this.onSearchChange(event.target.value)}/>
                        </div>
                    </div>
                </form>
                <form className="form-inline row">
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" 
                               onChange={event => this.onSearchScopeChange("keywords", event.target.checked)}
                            /> In keywords
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" 
                                onChange={event => this.onSearchScopeChange("tags", event.target.checked)}
                            /> In tags
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" 
                                onChange={event => this.onSearchScopeChange("desc", event.target.checked)}
                            /> In descriptions
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" 
                                onChange={event => this.props.onSearchFilterTermChange(event.target.checked)}
                            /> Only open topics
                        </label>
                    </div>
                </form>
            </div>
        )
    }

    // change search term, callback to the parent
    onSearchChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

    onSearchScopeChange(term, state){
        this.props.onSearchScopeTermChange(term,state);
    }
}

export default SearchBar;