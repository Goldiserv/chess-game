import { ReactNode } from 'react';

const cssOptions = {
  disabled: 'text-white bg-gray-300 border-transparent dark:border-gray-600 ',
  default:
    'text-white bg-blue-500 hover:bg-blue-700 border-transparent dark:bg-black dark:hover:bg-blue-900 dark:border-gray-600 ',
  danger:
    'text-white bg-red-500 hover:bg-red-700 border-transparent dark:bg-red-900 dark:hover:bg-red-700 dark:border-gray-600',
};

export default function Button({
  labelText,
  onClick,
  extraClassName,
  id,
  type,
  disabled,
}: {
  labelText: string | ReactNode;
  onClick: () => void;
  extraClassName?: string;
  id?: string;
  type?: 'default' | 'danger';
  disabled?: boolean;
}) {
  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      className={`mr-2 inline-block rounded-md text-center px-2 py-1 whitespace-nowrap border-2 ${extraClassName}     
      ${disabled ? cssOptions.disabled : cssOptions[type || 'default']}`}
      onClick={onClick}
    >
      {labelText}
    </button>
  );
}

Button.defaultProps = {
  extraClassName: '',
  id: null,
  type: 'default',
  disabled: false,
};
