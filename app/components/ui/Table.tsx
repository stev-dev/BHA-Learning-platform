import React from "react";

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export default function Table({ headers, rows, className = "" }: TableProps) {
  return (
    <table className={`w-full border-collapse border border-gray-200 ${className}`}>
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header, index) => (
            <th key={index} className="border border-gray-300 p-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-300 p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}