import React, { Component } from 'react';
import ResultDetailItem from './result-detail-item';


const ResultList = (props) => {
    const topicItems = props.topics.map((topic) =>{
        return <ResultDetailItem 
            key={topic.title}
            topic={topic}
        />
    })
    return (
        <div className="col-md-12">
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Call Status</th>
                    <th>Open Date</th>
                    <th>Close Date</th>
                </tr>
                </thead>
                <tbody>
                    {topicItems}
                </tbody>
            </table>
        </div>
    )
}

export default ResultList;