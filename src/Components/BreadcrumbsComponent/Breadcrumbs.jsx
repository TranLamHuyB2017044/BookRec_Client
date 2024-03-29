// Breadcrumbs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <div className='mx-auto pt-3 -mb-6 max-w-[1400px]'>
      {paths.map((path, index) => (
        <span key={index} className='cursor-pointer'>
          {index > 0 && ' > '}
          {path.link ? (
            <Link  className='hover:text-[#f47830] cursor-pointer' to={path.link}>{path.label}</Link>
          ) : (
            <span className='hover:text-[#f47830] cursor-pointer'>{path.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;