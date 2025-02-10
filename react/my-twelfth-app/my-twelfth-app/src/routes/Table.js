// src/Table.js
import React, { Component } from 'react';
import { Link } from "react-router-dom";
// Componente funciona con arrow function
const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Remove</th>
            </tr>
        </thead>
    );
}
// Componente funciona con la función tradicional
function TableBody(props) {
    const rows = props.peopleData.map((row, index) => {
        return (
            <tr key={row.id}>
                <td><Link to={"/users/"+row.id}>{row.name}</Link></td>
                <td>{row.job}</td>
                <td><button onClick={() => props.removePeople(index)}>Delete</button></td>
            </tr>
        );
    });
    return (
        <tbody>
            {rows}
        </tbody>
    );
}
// Componente de clase
class Table extends Component {
    render() {
        const { peopleData, title, removePeople } = this.props;
        return (
            <>
                {title}
                <table>
                    <TableHeader />
                    <TableBody
                        peopleData={peopleData}
                        removePeople={removePeople} />
                </table>
            </>
        );
    }
}
export default Table;