import React, { useState } from 'react';

export const EditableInput = ({ data }) => {
  const [inputValue, setInputValue] = useState(data);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
        <>
          <input
            id={data.id}
            type="text"
            placeholder={data}
            value={inputValue}
            onChange={handleInputChange}
          />
        </>
      
    </div>
  );
};

