import React, { useEffect, useState } from 'react'
import { Employee } from '../../../types/Employee'
import { BASE_URL } from '../../../config'


interface Props {
  onSelect: (employee: Employee) => void
  value?: string
  hint?: string
  success?: boolean
  error?: boolean
  disabled?: boolean
  name?: string
}

const EmployeeAutoComplete: React.FC<Props> = ({
  onSelect,
  value = '',
  hint,
  success = false,
  error = false,
  disabled = false,
  name = ''
}) => {
  const [query, setQuery] = useState(value)
  const [suggestions, setSuggestions] = useState<Employee[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

useEffect(() => {
  const controller = new AbortController();
  if (query.length >= 1 && !disabled) {
    const timeout = setTimeout(() => {
    const eyy = `${BASE_URL}/employeeAutoCompleter.action?searchString=${encodeURIComponent(query)}`;
      fetch(eyy)
        .then((res) => res.json())
        .then((data) => {
          const parsed = Object.entries(data).map(([fullname, employeeId]) => ({
            fullname,
            employeeId: Number(employeeId),
          }));
          setSuggestions(parsed);
          setShowDropdown(true);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setSuggestions([]);
            setShowDropdown(false);
          }
        });
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  } else {
    setSuggestions([]);
    setShowDropdown(false);
  }
}, [query, disabled]);

  const handleSelect = (employee: Employee) => {
    setQuery(employee.fullname)
    setShowDropdown(false)
    onSelect(employee)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex])
    }
  }

  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30`

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`
  } else if (error) {
    inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`
  } else if (success) {
    inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`
  }


  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActiveIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        placeholder="Search employee..."
        autoComplete="off"
        disabled={disabled}
        name={name}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? 'text-error-500'
              : success
              ? 'text-success-500'
              : 'text-gray-500'
          }`}
        >
          {hint}
        </p>
      )}

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-md max-h-52 overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
          {suggestions.map((employee, index) => (
            <li
              key={employee.employeeId}
              className={`cursor-pointer px-4 py-2 text-sm ${
                index === activeIndex
                  ? 'bg-gray-200 dark:bg-gray-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              } text-gray-700 dark:text-white`}
              onClick={() => handleSelect(employee)}
            >
              {employee.fullname}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EmployeeAutoComplete
