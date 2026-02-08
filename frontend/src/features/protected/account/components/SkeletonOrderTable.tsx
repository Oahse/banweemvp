import React from 'react';

interface SkeletonOrderTableProps {
  rows?: number;
  animation?: 'pulse' | 'wave';
}

const SkeletonOrderTable: React.FC<SkeletonOrderTableProps> = ({ rows = 3, animation = 'pulse' }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="bg-gray-200 p-2">Order ID</th>
          <th className="bg-gray-200 p-2">Date</th>
          <th className="bg-gray-200 p-2">Status</th>
          <th className="bg-gray-200 p-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, idx) => (
          <tr key={idx}>
            {[...Array(4)].map((_, colIdx) => (
              <td key={colIdx} className="p-2">
                <div
                  className={`h-4 bg-gray-300 rounded ${animation === 'pulse' ? 'animate-pulse' : 'animate-wave'}`}
                  style={{ width: '80%' }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { SkeletonOrderTable };