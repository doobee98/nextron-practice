import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  border-color: transparent;
  border-radius: 9999px;
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  color: inherit;
  background-color: inherit;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }
`;

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHover?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onHoverOut?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = 'button',
    disabled,
    onClick,
    onHover,
    onHoverOut,
    className,
    children,
  } = props;

  return (
    <ButtonWrapper
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
