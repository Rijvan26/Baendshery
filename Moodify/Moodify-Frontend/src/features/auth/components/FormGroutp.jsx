const FormGroutp = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        name={label}
        value={value}          // ✅ controlled
        onChange={onChange}    // ✅ updates state
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroutp;