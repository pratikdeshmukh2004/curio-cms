import { faCross, faMultiply, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";

export default function NewDiagram({ isOpen, setIsOpen, fetchDiagrams }) {
  const [values, setValues] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    if (e.target.type == "file") {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
      return;
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("id", values.id);
      formData.append("name", values.name);
      formData.append("introduction", values.introduction);

      axios
        .post(
          "/api/diagrams?access_id=" + process.env.NEXT_PUBLIC_ACCESS_ID,
          formData,
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
        })
        .catch((error) => {
          setIsOpen(false);
          fetchDiagrams();
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("File upload failed:", error);
      // Handle error
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div class="relative w-full max-w-md max-h-full">
                  <div class="relativ">
                    <h3 class="text-lg py-3 font-semibold text-center text-gray-900">
                      Create New Diagram
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      onChange={handleChange}
                      class="lg:p-4 p-2 md:p-3"
                    >
                      <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                          <label
                            for="id"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Diagram ID
                          </label>
                          <input
                            type="number"
                            name="id"
                            id="id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-gray-600 block w-full p-2.5 placeholder-gray-400"
                            placeholder="Type diagram ID"
                            required
                          />
                        </div>
                        <div class="col-span-2">
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Diagram Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-gray-600 block w-full p-2.5 placeholder-gray-400"
                            placeholder="Type diagram name"
                          />
                        </div>
                        <div class="col-span-2">
                          <label
                            for="image"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Diagram Image
                          </label>
                          <input
                            type="file"
                            name="image"
                            id="image"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-gray-600 block w-full p-2.5 placeholder-gray-400"
                            placeholder="Type diagram name"
                            required=""
                          />
                        </div>

                        <div class="col-span-2">
                          <label
                            for="introduction"
                            class="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Diagram Introduction
                          </label>
                          <textarea
                            id="introduction"
                            rows="4"
                            name="introduction"
                            class="block p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus:border-gray-500   placeholder-gray-400  focus:ring-blue-500 "
                            placeholder="Type diagram introduction"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-0 justify-between mt-8">
                        <button
                          onClick={closeModal}
                          type="button"
                          class="text-white inline-flex justify-center items-center bg-rose-500 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                          <FontAwesomeIcon className="mr-2" icon={faMultiply} />
                          Close
                        </button>
                        <button
                          type="submit"
                          class="text-white inline-flex justify-center items-center bg-sky-500 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                          <FontAwesomeIcon className="mr-2" icon={faPlus} />
                          Add new Diagram
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
