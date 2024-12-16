import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-950 flex py-5 px-3 items-center lg:px-20">
      <Link href={"/"}>
        <h1 className="text-xl font-extrabold text-white jersey-15-regular">
          CurIO CMS
        </h1>
      </Link>
      <ul className="flex  ml-auto gap-3 lg:gap-10">
        {/* <li className="text-gray-300 font-bold text-sm lg:text-md hover:text-sky-500 jersey-15-regular">
          <a href="/diagrams">Diagrams</a>
        </li>
        <li className="text-gray-300 font-bold text-sm lg:text-md hover:text-sky-500 jersey-15-regular">
          <a href="/diagrams/create">Pointers</a>
        </li> */}
        <li className="text-gray-300 font-bold hover:scale-125 cursor-pointer">
          <FontAwesomeIcon className="text-2xl" icon={faUserCircle} />
        </li>
      </ul>
    </header>
  );
}
