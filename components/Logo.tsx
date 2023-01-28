import Image from "next/image";
import logo_png from "../public/logo.png"
function Logo(props:any) {
    const {renderDefault, title} = props;
  return (  
    <div className="flex items-center space-x-2">
        <Image 
        className="rounded-full object-cover"
        height={50}
        width={50}
        src={logo_png}
        alt=""
        />
        <>{renderDefault(props)}</>
    </div>
  )
}

export default Logo