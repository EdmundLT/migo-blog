import Link from "next/link";
import logo_png from "../public/logo.png";
import Image from "next/image";

function Header() {
  return (
    <header className="text-black flex items-center justify-between space-x-2 px-10 py-5">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Link href="/" className="flex">
          <Image
            className="rounded-full object-cover"
            height={50}
            width={50}
            src={logo_png}
            alt=""
          />
        <h1 className="pt-3 pl-1">Otto Notes</h1>
        </Link>
      </div>
      
    </header>
  );
}
export default Header;
