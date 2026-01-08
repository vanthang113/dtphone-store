import React from 'react';
import {cn} from '@/lib/utils'



interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string
}
const Input: React.FC<InputProps> = ({

    label,
    id,
    name,
    type = "text",
    className,
    ...props

}) => {
    return (

        <div className="relative">
            <input
               id={id}
               name={name}
               type={type}
               placeholder=" "
               className={cn(
                 "border-b w-full  border-gray-300 py-1 focus:border-b-1 focus:border-blue-700 focus:w-full  transition-colors  duration-500 ease-in-out focus:outline-none peer bg-inherit",
                 className
               )}
               {...props}
            />
            <label
            htmlFor={id}

                className="absolute text-gray-500 -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
            >
                {label}
            </label>
        </div>

    );
};

export default Input;