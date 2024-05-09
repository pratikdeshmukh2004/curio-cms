import Header from "@/components/Header";
import NewPointer from "@/components/NewPointer";
import SquareBox from "@/components/SquareBox";
import {
  faArrowAltCircleLeft,
  faBan,
  faRectangleList,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Pointers = () => {
  const [pointers, setPointers] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({});
  const [TMode, setTMode] = useState(true);

  const row = 14;
  const col = 25;

  const router = useRouter();
  const { id } = router.query;

  const fetchPointers = async () => {
    const res = await fetch(
      `/api/pointers?access_id=${process.env.NEXT_PUBLIC_ACCESS_ID}&id=${id}`
    );
    const data = await res.json();
    setPointers(data);
  };

  useEffect(() => {
    if (!id) return;
    fetchPointers();
  }, [id]);

  const handleClick = (pointer) => {
    setIsOpen(true);
    if (pointer) {
      setValues({ ...pointer });
    }
  };

  return (
    <div>
      <Header />
      <NewPointer
        isOpen={isOpen}
        fetchPointers={fetchPointers}
        setIsOpen={setIsOpen}
        values={values}
        setValues={setValues}
      />
      <section className="lg:px-20 px-3 py-10">
        <div className="flex lg:flex-row flex-col justify-between">
          <h1 className="font-extrabold text-2xl text-gray-800">
            <Link href={"/diagrams"}>
              <FontAwesomeIcon
                icon={faArrowAltCircleLeft}
                className="cursor-pointer hover:scale-125  hover:text-sky-500 mr-3"
              />
            </Link>
            Pointers
          </h1>
          <div className="flex lg:flex-row flex-col-reverse gap-3 lg:gap-5 lg:py-0 py-5">
            <button
              type="button"
              onClick={() => setTMode(!TMode)}
              class="text-gray-700 w-full lg:w-fit whitespace-nowrap hover:text-white border border-gray-500 hover:bg-sky-500 hover:border-sky-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <FontAwesomeIcon icon={faRightLeft} className="mr-2" />
              Switch Mode
            </button>
          </div>
        </div>

        <div className="flex flex-wrap overflow-auto lg:overflow-visible">
          {/* Render 25 columns and 14 rows */}
          {!TMode &&
            [...Array(row)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {[...Array(col)].map((_, colIndex) => {
                  const p_id = String(colIndex + rowIndex * 25 + 1).padStart(
                    4,
                    "0"
                  );
                  const pointer = pointers?.filter(
                    (pointer) => pointer.id == p_id
                  );
                  return (
                    <SquareBox
                      handleClick={handleClick}
                      key={p_id}
                      diagram_id={id}
                      id={p_id}
                      pointer={pointer?.length ? pointer[0] : null}
                    />
                  );
                })}
              </div>
            ))}

          {TMode && (
            <div class="relative w-full overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Pointer ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Diagram ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Text
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pointers && pointers.length === 0 && (
                    <tr class="bg-white border-b font-medium whitespace-nowrap text-gray-900 border-gray-300">
                      <td
                        class="px-6 animate-pulse bg-rose-50 py-4 text-center text-rose-500"
                        colSpan="6"
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-2" />
                        No pointers found
                      </td>
                    </tr>
                  )}
                  {pointers &&
                    pointers?.map(
                      (pointer) =>
                        pointer.description && (
                          <tr class="bg-white border-b font-medium whitespace-nowrap text-gray-900 border-gray-300">
                            <th scope="row" class="px-6 py-4">
                              {pointer.id}
                            </th>
                            <td class="px-6 py-4 max-w-sm truncate">
                              {pointer.diagram_id}
                            </td>
                            <td class="px-6 py-4 max-w-sm truncate">
                              {pointer.description}
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Pointers;
