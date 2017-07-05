import React, { Component } from 'react';
import logo from './logo.svg';
import FuzzySearch from 'react-fuzzy';
import './App.css';
import data from './data.json'
import { Container, Row, Col, InputGroup, InputGroupAddon, Input, InputGroupButton, Table } from 'reactstrap';





class ResultTable extends React.Component {


  render() {
    const results = this.props.results;
    return (
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Keywords</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td><a href={results.url}>{results.title}</a></td>
          <td>{results.keywords}</td>
          <td dangerouslySetInnerHTML={{__html: results.desc}} />
          </tr>

        </tbody>
      </Table>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      results: {title: " "}
    }

    this.y = this.y.bind(this);
  }


  x(props, state, styles){
      return state.results.map((val, i) => {
        const style = state.selectedIndex === i ? styles.selectedResultStyle : styles.resultsStyle;
        return (
          <div
            key={i}
            style={style}
          >
            {val.title}
            <span style={{ float: 'right', opacity: 0.5 }}>Status: {val.callStatus}</span>
          </div>
        );
      });
    }


  y(selected){
    this.setState({
      results: selected
    })
  }
  render() {
    // the template of dropdown
    return (
      <div className="App">
        <div className="container">
          <Row>
            <Col sm="12">
                <h2> FundIT Pilot Study </h2>
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <FuzzySearch
                list={data}
                keys={['title','keywords', 'tags', 'flags', 'desc']}
                width={1020}
                //onSelect={action('selected')}
                onSelect={this.y}
                resultsTemplate={this.x}
              />
            </Col>
          </Row>
          <ResultTable results={this.state.results}/>
        </div>
      </div>
    );
  }
}

export default App;
