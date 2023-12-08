import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="mt-5 px-5 md:mt-10">
      <h1 className="text-3xl font-bold md:text-5xl text-center">
        Why is threshold testing important?
      </h1>
      <p className="text-lg mt-2 md:text-2xl md:mt-7 text-center">
        Threshold testing plays a pivotal role in triathlon training and
        performance optimization. Understanding and regularly assessing
        individual thresholds, such
        <span className="font-bold capitalize">
          {" "}
          critical swim speed (CSS)
        </span>{" "}
        and
        <span className="font-bold capitalize"> critical power (CP)</span>, is
        crucial for tailoring training programs to specific needs. These tests
        provide valuable insights into an athlete's physiological limits and
        help identify the intensity at which the body transitions from aerobic
        to anaerobic metabolism.
      </p>
      <p className="text-lg mt-2 md:text-2xl md:mt-7 text-center">
        By pinpointing these thresholds, athletes and coaches can design
        training zones that enhance{" "}
        <span className="font-bold capitalize"> endurance</span>,
        <span className="font-bold capitalize"> power</span>, and
        <span className="font-bold capitalize"> speed </span>
        while minimizing the risk of{" "}
        <span className="font-bold underline decoration-black">
          overtraining
        </span>{" "}
        and
        <span className="font-bold underline decoration-black"> injury</span>.
        Ultimately, threshold testing is an indispensable tool for fine-tuning
        triathlon training strategies, ensuring that athletes reach their peak
        fitness levels and achieve their competitive goals.
      </p>
      <h1 className="text-3xl font-bold md:text-5xl text-center md:mt-20 mt-10">
        Interested in Hiring a Coach?
      </h1>
      <div className="flex w-full justify-center mt-5 mb-16 md:mt-7 md:mb-20">
        <Link href="/Coaching">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex">
            Click Here!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
