import React from 'react'
import { useState } from 'react';


const Paginate = ({itemsPerPage, totalItems, render}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} onClick={() => handleClick(i)}>{i}</li>
            );
        }

        return pageNumbers;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
        <div>
            {render(indexOfFirstItem, indexOfLastItem)}
        </div>

        <ul id='page-numbers'>
                {renderPageNumbers()}
        </ul>
    </div>
  )
}

export default Paginate