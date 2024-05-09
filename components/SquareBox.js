// SquareBox.js
import React from "react";

const SquareBox = ({ id, pointer, handleClick, diagram_id }) => {
  // Format the ID to have leading zeros
  return (
    <div
      onClick={() => handleClick({ ...pointer, id, diagram_id })}
      className={
        "w-14 h-14 cursor-pointer border border-gray-400 hover:scale-110 flex justify-center items-center " +
        (pointer?.description
          ? "bg-sky-300"
          : "bg-gray-300 hover:bg-gray-100")
      }
    >
      <span className="text-gray-600">{id}</span>
    </div>
  );
};

export default SquareBox;
