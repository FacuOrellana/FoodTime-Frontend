import React from 'react'

export const DateInput = ({ 
    value, 
    setValue, 
    inputTitle, 
    inputName, 
    keyPressEvent, 
    placeholder, 
    col, 
    disabled, 
    marginT, 
    today 
}) => {
    // Calcula la fecha máxima permitida (hace 15 años desde hoy)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 15);
    const formattedMaxDate = maxDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="date" 
                data-testid="textbox" 
                className="form-control required dni center-block" 
                name={inputName} 
                placeholder={placeholder}
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                onKeyPress={keyPressEvent} 
                disabled={disabled}
                max={formattedMaxDate} // Aplica la restricción
            />
        </div>
    );
};

export const DateInputMin = ({ value, setValue, inputTitle, inputName, keyPressEvent, placeholder, col, disabled, marginT, today }) => {
    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="date" data-testid="textbox" className="form-control required dni center-block" name={inputName} placeholder={placeholder}
                value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={keyPressEvent} disabled={disabled}
                min={today}
            />
        </div>
    )
}