import React from "react";
import "../index.css";

/**
 * Table Component
 * 
 * A reusable table component to display data.
 * 
 * @param {Object} props - The properties object.
 * @param {Array} props.data - The array of data objects to display in the table.
 * @param {Array} props.columns - The array of column definitions.
 * @param {string} props.noDataMessage - The message to display when there is no data.
 * 
 * @returns {JSX.Element} The rendered table component.
 */
const Table = ({ data, columns, noDataMessage }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="no-data-message">
              {noDataMessage}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.header}>
                  {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;