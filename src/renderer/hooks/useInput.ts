import React from 'react';

const useInput = (defaultValue?: string) => {
  const [value, setValue] = React.useState(defaultValue || '');
  const onChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
  };

  return [value, onChangeValue, setValue] as [
    string,
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    React.Dispatch<React.SetStateAction<string>>,
  ];
};

export default useInput;
