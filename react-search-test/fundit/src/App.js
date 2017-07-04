import _ from 'lodash';
import React, { Component } from 'react';
import Fuse from 'fuse.js';

import logo from './logo.svg';
import './App.css';
import data from './data.json';

import SearchBar from './components/search-bar';
import ResultList from './components/result-list';

class App extends Component {
  
  constructor(props){
    super(props);


    this.state = {
        topics:[],
        keys: ["title"],
        filterOpenTopics: false
    };

    this.topicSearch = this.topicSearch.bind(this);
    this.searchScopeChange = this.searchScopeChange.bind(this);
    this.searchFilterChange = this.searchFilterChange.bind(this);
  }

  // search term
  topicSearch(term){
      let options = {
          shouldSort: true,
          threshold: 0.1,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: this.state.keys
        }
      let fuse = new Fuse(data, options); // "list" is the item array
      let result = fuse.search(term);

      if (this.state.filterOpenTopics){
        //let filterResult = result.filter((topic) => topic.callState === "Open")
        let filterResult = [];
        result.forEach((topic) => {
          if(topic.callStatus == "Open"){
            filterResult.push(topic);
          }
        })
        this.setState({
            topics: filterResult
          })
      }else{
        this.setState({
            topics: result
        })
      }
  }

  // change search scope, options key
  searchScopeChange(term, state){
    let list = this.state.keys;
    if(state){
      if(list.includes(term)){
        return;
      }else{
        list.push(term);
      }
    }else{
      if(list.includes(term)){
        list.splice(list.indexOf(term), 1);
      }
    }
    this.setState({
        keys: list
    })
  }

  //filter open topics
  searchFilterChange(state){
    if(state){
      this.setState({
        filterOpenTopics: true
      })
    }else{
      this.setState({
        filterOpenTopics: false
      })
    }

    // let filterdTopics = [];
    // if(state){
    //   if(this.state.topics !== null){
    //     filterdTopics = this.state.topics.map((topic) =>{
    //        return topic.callStatus == "open";
    //     })
    //   }
    // }
    // this.setState({
    //   topics: filterdTopics
    // })
    console.log("state: ",state)
    console.log(this.state.filterOpenTopics)
  }

  render() {
    const topicSearch = _.debounce((term) => {this.topicSearch(term)}, 300)
    return (
      <div className="App">
        <div className="container container-fluid">
          <div className="row">
            <div className="col-md-12 App-header">
              <h3 className="App-intro">FundIT</h3>
            </div>
            <SearchBar 
              onSearchScopeTermChange={this.searchScopeChange}
              onSearchFilterTermChange={this.searchFilterChange}
              onSearchTermChange={topicSearch}
            />
            <ResultList topics={this.state.topics}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
