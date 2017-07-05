import React, { Component } from 'react';

class FilterSidebar extends Component{
     constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <form className="form">
                    <div className="checkbox">
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
}

export default FilterSidebar;