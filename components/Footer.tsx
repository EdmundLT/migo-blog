function Footer() {
  let year = new Date().getFullYear();
  return (
 
<footer className="p-4 bg-white rounded-lg shadow md:flex justify-center md:items-center md:justify-center md:p-6 dark:bg-gray-800">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <span>Otto Notes</span>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap justify-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 pl-6">
        <li>
            <a href="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="/contact" className="mr-4 hover:underline md:mr-6">Contact</a>
        </li>
        <li>
            <a href="/about" className="hover:underline">About Us</a>
        </li>
    </ul>
</footer>
  )
}


export default Footer;

