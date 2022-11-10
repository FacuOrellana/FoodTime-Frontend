import React from 'react'

export const PageTitles = ({ title, subtitle, color }) => {
    return (
        <>
            <h1 className="text-3xl font-bold text-center"> {title} </h1>
            <h3 className={`text-2xl font-bold text-center mt-3 ${color}`}> <span className='bg-gray-800 px-4 py-2 rounded-md'>{subtitle}</span> </h3>
        </>
    )
}