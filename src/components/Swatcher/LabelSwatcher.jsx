import React from 'react';
import clsx from 'clsx';

const LabelSwatcher = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-3 py-1 border text-sm rounded transition-all duration-200',
        selected ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100'
      )}
    >
      {label}
    </button>
  );
};

export default LabelSwatcher;
