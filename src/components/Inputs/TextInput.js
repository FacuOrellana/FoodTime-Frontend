import React from 'react'

export const TextInput = ({ 
    value, 
    setValue, 
    inputTitle, 
    inputName, 
    keyPressEvent, 
    placeholder, 
    col, 
    disabled, 
    marginT 
}) => {
    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="text"
                data-testid="textbox"
                className="form-control required dni center-block"
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    // Permitir solo letras y espacios
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                        setValue(inputValue);
                    }
                }}
                onKeyPress={(e) => {
                    // Permitir solo letras y espacios en tiempo de escritura
                    if (!/^[a-zA-Z\s]$/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                disabled={disabled}
            />
        </div>
    );
};


export const EmailInput = ({ value, setValue, inputTitle, inputName, keyPressEvent, placeholder, col, disabled, marginT }) => {
    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="email" data-testid="textbox" className="form-control required dni center-block" name={inputName} placeholder={placeholder}
                value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={keyPressEvent} disabled={disabled}
            />
        </div>
    )
}

export const PasswordInput = ({ value, setValue, inputTitle, inputName, keyPressEvent, placeholder, col, disabled, marginT }) => {
    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="password" data-testid="textbox" className="form-control required dni center-block" name={inputName} placeholder={placeholder}
                value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={keyPressEvent} disabled={disabled}
            />
        </div>
    )
}

export const TextInputWithHorizontalLabel = ({ value, setValue, inputTitle, inputName, keyPressEvent, placeholder, disabled }) => {
    return (
        <div className="row d-flex justify-content-center mt-4">
            <div className="col-12 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <p className="col-form-label">{inputTitle}</p>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <input
                    type="text" className="form-control" name={inputName} placeholder={placeholder}
                    value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={keyPressEvent} disabled={disabled}
                />
            </div>
        </div>
    )
}


export const NumberInput = ({ 
    value, 
    setValue, 
    inputTitle, 
    inputName, 
    placeholder, 
    col, 
    disabled, 
    marginT 
}) => {
    return (
        <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : '3'}`}>
            <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
            <input
                type="text"
                data-testid="textbox"
                className="form-control required dni center-block"
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    // Permitir solo números mayores a 0
                    if (/^[1-9]\d*$/.test(inputValue) || inputValue === "") {
                        setValue(inputValue);
                    }
                }}
                onKeyPress={(e) => {
                    // Permitir solo números positivos (1-9 inicialmente)
                    if (!/^[0-9]$/.test(e.key)) {
                        e.preventDefault();
                    }
                }}
                disabled={disabled}
            />
        </div>
    );
};

export const GenericInput = ({
    value,
    setValue,
    inputTitle,
    inputName,
    placeholder,
    col,
    disabled,
    marginT,
  }) => {
    return (
      <div className={`${marginT} col-md-6 col-sm-12 col-lg-${col ? col : "3"}`}>
        <label className="text-gray-100 text-lg mb-1">{inputTitle}</label>
        <input
          type="text"
          className="form-control required dni center-block"
          name={inputName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)} // Aceptar cualquier entrada
          disabled={disabled}
        />
      </div>
    );
  };

