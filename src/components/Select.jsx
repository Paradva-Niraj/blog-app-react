import { forwardRef, useId } from "react";

function Select({
    options,
    label,
    className="",
    ...props
},ref) {

    const id = useId()

    return ( 
        <div className="w-full">
            {label && <label htmlFor={id} className="">{label}</label>}<br/>
            <select {...props} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 mt-1 w-full ${className}`}>
                {
                    options && options.map(({ label, value }) => (
                        <option key={value} value={value}>{label}</option>
                    ))
                }
            </select>
        </div>
     );
}

export default forwardRef(Select);