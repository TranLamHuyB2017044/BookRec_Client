// Breadcrumbs.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ paths }) => {
  return (
    <div className='mx-auto my-5 max-w-[1400px]'>
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          {path.link ? (
            <Link to={path.link}>{path.label}</Link>
          ) : (
            <span>{path.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;