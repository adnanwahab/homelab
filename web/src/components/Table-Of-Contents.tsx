import React from 'react';

interface Section {
  id: number;
  title: string;
  content: string;
  wordCount: number;
}

const TableOfContents: React.FC = () => {
  const sections: Section[] = [
    {
      id: 2,
      title: "The House of Representatives",
      content: "The House of Representatives shall be composed of Members chosen every second Year...",
      wordCount: 300
    },
    // ... add other sections
  ];

  for (let i = 0; i < 3; i++) {
    sections[i] = {
      ...sections[i],
      id: i + 1
    }
  }

  return (
    <div className="w-full bg-gray-900 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((section) => (
          <div 
            key={section.id}
            className="border border-gray-700 rounded-lg p-4 bg-gray-800 hover:bg-gray-700 
                       transition-colors duration-200 cursor-pointer"
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Section {section.id}: {section.title}
            </h2>
            <p className="text-gray-300 text-sm mb-4 line-clamp-4">
              {section.content}
            </p>
            <div className="text-gray-400 text-xs">
              {section.wordCount} words
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;
// https://manual.omakub.org/1/read#leaf_42