"use client";

interface KeyInsightsProps {
  insights: string[];
}

export default function KeyInsights({ insights }: KeyInsightsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-semibold mb-4">Key Insights</h2>
      <ul className="space-y-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
              {index + 1}
            </span>
            <span className="text-sm text-gray-700">{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}