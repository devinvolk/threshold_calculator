import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const CoachingModal = ({ isModalVisible, setIsModalVisible, hasModalClosed, handleClose }) => {

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 1000;
      if (!hasModalClosed && window.scrollY > scrollThreshold) {
        setIsModalVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasModalClosed]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${
        isModalVisible ? "block" : "hidden"
      }`}
    >
      <div className="absolute w-4/5 bg-white shadow-2xl rounded-2xl">
        <div className="flex justify-end mt-3 mr-2">
          <AiOutlineClose color="black" size={25} onClick={handleClose} />
        </div>
        <h1 className="text-3xl font-bold md:text-5xl text-center mx-4 mt-2 md:mt-36">
          Interested in Hiring a Coach?
        </h1>
        <div className="flex w-full justify-center mt-5 mb-7 md:mt-7 md:mb-36">
          <Link href="/Coaching">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex">
              Click Here!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoachingModal;
