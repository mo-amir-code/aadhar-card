

interface InputFieldType{
    identity: string,
    type: string,
    title: string,
    placeholder: string,
    handle: Function,
    error?: {
        title: string | null,
        msg: string | null
    }
}

const InputField = ({type, identity, placeholder, title, error, handle}:InputFieldType) => {


    const handleOnChange = (value:string) => {
        handle({
            title: identity,
            value: value
        });
    }

  return (
    <div className="my-2" >
        <span className="text-sm font-semibold" >{title}</span>
        <input onChange={(e)=> handleOnChange(e.target.value)} type={type} placeholder={placeholder} className="outline-none w-full py-2" />
        {(error && error?.title === identity) ? <span style={{color: "red"}} className="text-xs" >{error?.msg}</span> : null}
    </div>
  )
}

export default InputField
