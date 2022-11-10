import React from 'react'
import { Link } from 'react-router-dom'

export const MenuButton = ({ link, title }) => {
    return (
        <div className='flex justify-center mt-10'>
            <Link to={link}>
                <button className='bg-orange-600 p-4 rounded-lg w-52 hover:bg-teal-500 hover:text-gray-300 text-white'>
                    {title}
                </button>
            </Link>
        </div>
    )
}