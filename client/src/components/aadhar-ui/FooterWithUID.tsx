import "../../aadhar.css"

const FooterWithUID = ({uid}:{uid:string}) => {
  return (
    <> 
        <div  className="px-1 text-lg text-center font-medium" >{uid}</div>
        <div style={{height: 2}} className="bg-red-700" />
    </>
  )
}

export default FooterWithUID
