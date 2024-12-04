import { ChangeEvent } from "react";

interface InputLabelsType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string;
    className?: string
  }
  
export function InputLabels({ label, placeholder, onChange, type ,className}: InputLabelsType) {
    return (
      <div>
        <div>
          <label className="block mb-2 text-sm   text-black font-bold pt-4">
            {label}
          </label>
          <input
            onChange={onChange}
            type={type || "text"}
            className={`bg-gray-50 border border-gray-300 ${className} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2`}
            placeholder={placeholder}
            required
          />
        </div>
      </div>
    );
  }
  