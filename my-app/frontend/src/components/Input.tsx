const Input = ({
  id,
  label,
  placeholder,
  defaultValue,
}: {
  id: string
  label: string
  placeholder: string
  defaultValue?: string | number
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </>
  )
}

export default Input
