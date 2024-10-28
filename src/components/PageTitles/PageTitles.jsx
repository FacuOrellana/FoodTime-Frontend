import React from 'react';

export const PageTitles = ({ title, subtitle, color }) => {
    return (
        <>
            <h1 className="text-3xl font-bold text-center text-black-700"> {title} </h1>
            <h3 className={`text-2xl font-bold text-center mt-3 ${color}`}>
                <span className='bg-orange-200 text-orange-800 px-4 py-2 rounded-md'>
                    {subtitle}
                </span>
            </h3>
        </>
    );
};
