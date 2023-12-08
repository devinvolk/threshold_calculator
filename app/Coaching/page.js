"use client";

import Image from "next/image";
import React from "react";

const Coaching = () => {
  const handleClick = () => {
    const messageSection = document.getElementById("formTitle");
    if (messageSection) {
      messageSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "This feature is still in development. Please message @devinvolk on Instagram. Thank you!"
    );
  };

  return (
    <div>
      <div className="w-full relative">
        <Image
          src="/images/hero_coaching.JPG"
          width={1500}
          height={500}
          alt="Devin Volk cycling in Red Rocks, Nevada"
          objectFit="cover"
        ></Image>
        {/* mobile render */}
        <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-10">
          <h1 className="font-bold drop-shadow-sm text-white text-center text-4xl mx-5">
            Hi, I'm Devin Volk
          </h1>
        </div>
        {/* larger devices render */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-10">
          <h1 className="capitalize font-bold drop-shadow-sm text-white text-center text-8xl mx-5">
            Ready to take your training to the next level?
          </h1>
          <div className="flex justify-center mt-5">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-5 px-10 rounded-2xl flex"
            onClick={handleClick}
          >
            Click Here!
          </button>
        </div>
        </div>
      </div>
      <div className="mx-5 md:mx-10">
        {/* mobile render */}
        <div className="md:hidden">
        <p className="text-2xl text-center mt-10">Over the years, I have successfully coached numerous athletes to <span className="font-bold">Personal Best's, Ironman World Championship's,</span> and <span className="font-bold">Boston Marathon Qualifications. </span>
          I believe that with the right support, guidance, and training plan, everyone can stay <span className="font-bold">injury free, happy,</span> and <span className="font-bold">succeed</span>.
        </p>
        <p className="text-2xl text-center mt-10">
          If you are interested in taking your sports performance to the next
          level or would like some general feedback on your current training
        </p>
        <div className="flex justify-center mt-5">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex"
            onClick={handleClick}
          >
            Click Here!
          </button>
        </div>
        </div>
        {/* larger devices render */}
        <div className="hidden md:block">
          <h1 className="text-5xl text-center mx-5 mt-20">Hi, I'm <span className="font-bold">Devin Volk</span>, creator of this site and endurance sports coach!</h1>
          <p className="text-2xl text-center mt-10">Over the years, I have successfully coached numerous athletes to <span className="font-bold">Personal Best's, Ironman World Championship Qualifications,</span> and <span className="font-bold">Boston Marathon Qualifications. </span>
          I believe that with the right training plan, every athlete can stay <span className="font-bold">Injury Free, Happy,</span> and <span className="font-bold">Succeed</span>.
          </p>
        </div>
        <h2 className="capitalize text-5xl text-center mt-16">
          Why you should get a coach:
        </h2>
        <p className="text-2xl text-center mt-5">
          Engaging a coach for endurance sports isn't a luxury but a strategic
          necessity. Endurance activities demand a unique blend of{" "}
          <span className="font-bold">physical</span> and{" "}
          <span className="font-bold">mental</span> attributes, making{" "}
          <span className="font-bold">personalized guidance</span> crucial. A
          coach tailors training plans to individual strengths, minimizes injury
          risks, and provides insights into nutrition and recovery. With
          expertise in periodized training and constructive feedback, a coach
          not only optimizes performance but also serves as a consistent source
          of <span className="font-bold">motivation</span> and{" "}
          <span className="font-bold">accountability</span>, propelling athletes
          to reach their full potential in endurance sports.
        </p>
        <h1 className="capitalize text-5xl text-center mt-16" id="formTitle">
          Send me a message!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-10 mx-2 md:mx-auto md:w-4/5"
        >
          <label htmlFor="name" className="text-xl">
            Name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            className="shadow md:shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <label htmlFor="email" className="text-xl mt-10">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            className="shadow md:shadow-lg appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <label htmlFor="message" className="text-xl mt-10">
            Message:
          </label>
          <input
            id="message"
            type="text"
            placeholder="Write your message here..."
            className="shadow md:shadow-lg appearance-none border rounded pt-2 pb-80 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
          <div className="flex justify-center mt-10 mb-20">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Coaching;
