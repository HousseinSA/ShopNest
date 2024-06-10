import { forwardRef } from "react";

export interface ButtonProps 
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{}


const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    children, className, disabled, type='button', ...props
}, ref)=>{
    return (
        <button className={className}   ref={ref}>
{children}
        </button>
    )
})

export default Button
Button.displayName = 'Button';