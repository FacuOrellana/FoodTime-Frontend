import React from 'react'

export const SelectInput = ({ value, setValue, inputTitle, inputName, dataOptions = [], col, marginT }) => {
    return (
        <div className={`${marginT} col-md-${col ? col : '6'} col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <select
                id={inputName} 
                name={inputName} 
                className="form-select required center-block"
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            >
                <option value="">Selecciona una opción</option>
                {dataOptions.map((item) => (
                    <option key={item.id} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export const SelectInputWithHorizontalLabel = ({ value, setValue, inputTitle, inputName, dataOptions }) => {
    return (
        <div className="row d-flex justify-content-center mt-4">
            <div className="col-12 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <p className="col-form-label">{inputTitle}</p>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <select
                    id={inputName} name={inputName} className="form-select required center-block"
                    value={value} onChange={(e) => { setValue(e.target.value) }}
                >
                    {dataOptions?.map((item) => (
                        <option value={item.value}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export const SelectInputPageSize = ({ value, setValue, inputName, dataOptions, col }) => {
    return (
        <div className={`col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <select
                id={inputName} name={inputName} className="form-select required center-block me-2"
                value={value} onChange={(e) => { setValue(parseInt(e.target.value)) }} style={{ height: '40px', width: '100px' }}
            >
                {dataOptions.map((item) => (
                    <option value={item.value}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}