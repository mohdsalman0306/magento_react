export default function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options
        .filter((option) => !option.is_deferred)
        .map((option) => (
          <>
            <label key={option.code}>
              <input
                type="radio"
                name={option.code}
                value={option.code}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="form-radio text-purple-600"
              />
              <span> {option.title}</span>
            </label>
          </>
        ))}
    </div>
  );
}
