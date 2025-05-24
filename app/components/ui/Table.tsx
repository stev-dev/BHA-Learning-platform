// components/ui/Table.tsx
import React from "react";

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export function Table({ headers, rows, className = "" }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full ${className} divide-y divide-gray-200 border rounded-xl shadow-sm`}>
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="py-3 px-4 text-left font-semibold text-gray-500 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 1 ? "bg-gray-50" : ""}>
              {row.map((cell, i) => (
                <td key={i} className="py-3 px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
