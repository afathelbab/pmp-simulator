import React from "react";

export default function CategorySelection({ categories, onSelect }) {
  return (
    <div>
      <h1>Select a Quiz Category</h1>
      {categories.map((category) => (
        <button key={category} onClick={() => onSelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}
