import React from 'react';

const ResultDetailItem = ({topic}) =>{
    return(
        <tr>
            <td>{topic.title}</td>
            <td>{topic.callStatus}</td>
            <td>{topic.plannedOpeningDate}</td>
            <td>{topic.deadlineDates[0]}</td>
        </tr>
    )
}

export default ResultDetailItem;