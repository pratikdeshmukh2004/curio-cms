import Header from "@/components/Header";
import NewDiagram from "@/components/NewDiagram";
import {
  faBan,
  faDownload,
  faHandPointer,
  faPencilAlt,
  faPlus,
  faSearch,
  faSpinner,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Diagrams = () => {
  const [diagrams, setDiagrams] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeEdit, setActiveEdit] = useState(null);

  const fetchDiagrams = async () => {
    const res = await fetch(
      "/api/diagrams?access_id=" + process.env.NEXT_PUBLIC_ACCESS_ID
    );
    const data = await res.json();
    setDiagrams(data);
  };

  useEffect(() => {
    fetchDiagrams();
  }, []);

  const handleDelete = async (id) => {
    toast.loading("Deleting diagram...");
    try {
      axios
        .delete(
          `/api/diagrams?access_id=${process.env.NEXT_PUBLIC_ACCESS_ID}&id=${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important to set Content-Type as multipart/form-data
            },
          }
        )
        .then((response) => {
          setIsOpen(false);
          fetchDiagrams();
          console.log("Response:", response.data);
          toast.remove();
          toast.success("Diagram deleted successfully");
        })
        .catch((error) => {
          setIsOpen(false);
          fetchDiagrams();
          console.error("Error:", error);
          toast.remove();
          toast.error("Failed to delete diagram");
        });
    } catch (error) {
      console.error("Internal server error:", error);
      // Handle error
    }
  };

  return (
    <div>
      <Header />
      <NewDiagram
        isOpen={isOpen}
        fetchDiagrams={fetchDiagrams}
        setIsOpen={setIsOpen}
        activeEdit={activeEdit}
        setActiveEdit={setActiveEdit}
      />
      <section className="lg:px-20 px-3 py-10">
        <div className="flex lg:flex-row flex-col justify-between">
          <h1 className="font-extrabold text-2xl text-gray-800">Diagrams</h1>
          <div className="flex lg:flex-row flex-col-reverse gap-3 lg:gap-5 lg:py-0 py-5">
            <form class="flex w-full lg:max-w-sm mx-auto">
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 font-medium outline-none border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
                  placeholder="Search diagram..."
                  required
                />
              </div>
              {/* <button
                type="button"
                class="text-gray-700 ml-2 flex items-center justify-center hover:text-white border border-gray-500 hover:bg-sky-500 hover:border-sky-500 focus:ring-4 focus:outline-none focus:ring-sky-300 font-bold rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
              >
                <FontAwesomeIcon size="lg" icon={faSearch} />
                <span class="sr-only">Search</span>
              </button> */}
            </form>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              class="text-gray-700 w-full lg:w-fit whitespace-nowrap hover:text-white border border-gray-500 hover:bg-sky-500 hover:border-sky-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Diagram
            </button>
          </div>
        </div>
        <div class="relative overflow-x-auto py-6">
          <table class="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Diagram ID
                </th>
                <th scope="col" class="px-6 py-3">
                  Diagram Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Intro
                </th>
                <th scope="col" class="px-6 py-3">
                  Diagram
                </th>
                <th scope="col" class="px-6 py-3">
                  Pointers
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {diagrams && diagrams.length === 0 && (
                <tr class="bg-white border-b font-medium whitespace-nowrap text-gray-900 border-gray-300">
                  <td
                    class="px-6 animate-pulse bg-rose-50 py-4 text-center text-rose-500"
                    colSpan="6"
                  >
                    <FontAwesomeIcon icon={faBan} className="mr-2" />
                    No diagrams found
                  </td>
                </tr>
              )}
              {diagrams == null && (
                <tr class="bg-white border-b font-medium whitespace-nowrap text-gray-900 border-gray-300">
                  <td
                    class="px-6 py-4 text-center bg-gray-50 animate-pulse"
                    colSpan="6"
                  >
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="mr-2 animate-spin"
                    />
                    Loading...
                  </td>
                </tr>
              )}
              {diagrams &&
                diagrams
                  ?.filter(
                    (item) =>
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase()) ||
                      item.id.includes(search) ||
                      item.intro
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  ?.reverse()
                  .map((diagram) => (
                    <tr class="bg-white border-b font-medium whitespace-nowrap text-gray-900 border-gray-300">
                      <th scope="row" class="px-6 py-4">
                        {diagram.id}
                      </th>
                      <td class="px-6 py-4">{diagram.name}</td>
                      <td class="px-6 py-4 max-w-sm truncate">
                        {diagram.intro}
                      </td>
                      <td class="px-6 py-4">
                        {diagram.image_name ? (
                          <span class="hover:text-sky-500 hover:border-sky-500 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 cursor-pointer">
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faDownload}
                            />
                            {diagram.image_name}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td class="px-6 py-4">
                        <Link
                          href={`/pointers?id=${diagram._id}`}
                          class="bg-gray-100 hover:text-sky-500 hover:border-sky-500 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 cursor-pointer border border-gray-500 "
                        >
                          <FontAwesomeIcon
                            className="mr-2"
                            icon={faHandPointer}
                          />
                          Pointers
                        </Link>
                      </td>
                      <td class="px-6 py-4 flex gap-5 text-lg">
                        <button
                          onClick={() => setActiveEdit(diagram)}
                          class="text-sky-500 hover:text-sky-700 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button
                          onClick={() => handleDelete(diagram._id)}
                          class="text-rose-500 hover:text-orange-700 hover:scale-110"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Diagrams;
