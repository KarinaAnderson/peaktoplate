import React, { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

// Base props common to all variants of the Button
interface ButtonBaseProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

// Generic ButtonProps type definition
// C is the component type, defaults to 'button'
// It combines our ButtonBaseProps with the props of the component C,
// excluding any props that overlap with ButtonBaseProps or the 'as' prop itself.
type ButtonProps<C extends ElementType = 'button'> = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<C>, keyof ButtonBaseProps | 'as'> & {
    as?: C;
  };

// The Button component is now a generic function component.
// The <C extends ElementType = 'button',> part defines the generic type C.
export const Button = <C extends ElementType = 'button',>({
  as,
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props // All other props specific to the component C
}: ButtonProps<C>) => {
  // If 'as' prop is provided, use it as the component, otherwise default to 'button'
  const Component = as || 'button';

  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent hover:bg-gray-100 text-green-600 focus:ring-green-500';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-4 py-2 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-6 py-3 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-8 py-4 text-lg min-h-[50px] sm:min-h-[60px]'; // Adjusted for responsiveness
      break;
    case 'xl':
      sizeStyles = 'px-10 py-5 text-xl min-h-[60px] sm:min-h-[70px]'; // Adjusted for responsiveness
      break;
  }

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <Component
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      {...props} // Spread the remaining props (e.g., 'to' for Link, 'type' for button)
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </Component>
  );
};
