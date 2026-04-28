// src/components/FormInput.jsx
import React from "react";

function FormInput({ label, name, value, onChange, type = "text", options = [], required = false, rows = 4, placeholder = "" }) {
  const baseClass = "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";
  const inputType = type === "currency" ? "number" : type;

  return (
    <label className="block">
      <span className="text-sm font-black uppercase tracking-wide text-slate-500">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      {type === "select" ? (
        <select name={name} value={value ?? ""} onChange={onChange} required={required} className={baseClass}>
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value ?? ""} onChange={onChange} required={required} rows={rows} placeholder={placeholder} className={baseClass} />
      ) : (
        <input name={name} value={value ?? ""} onChange={onChange} required={required} type={inputType} step={type === "currency" ? "0.01" : undefined} placeholder={placeholder} className={baseClass} />
      )}
    </label>
  );
}

export default FormInput;
