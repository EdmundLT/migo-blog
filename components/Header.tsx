import Link from "next/link";
import logo_png from "../public/logo.png";
import Image from "next/image";

function Header() {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Link href="/">
          <Image
            className="rounded-full object-cover"
            height={50}
            width={50}
            src={logo_png}
            alt=""
          />
        </Link>
        <h1>MigoNotes</h1>
      </div>
      <div></div>
      
    </header>
  );
}
export default Header;
