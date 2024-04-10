import React from "react";
import Slider from "react-slick";
import Dashboard from "assets/images/screenshots/img_dashboard_screenshot.png";
import RecordKeeping from "assets/images/screenshots/vid_recordkeeping (1).gif"
import Blog from "assets/images/screenshots/vid_blogs.gif"
import Space from "assets/images/screenshots/vid_parentstudent.gif"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import backgroundWaves2 from "assets/images/bg/Wavesss.svg";


export const Foo = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <>
      {/* Container for demo purpose */}
      <div className="container my-24 mx-auto md:px-6">
        {/* Section: Design Block */}
        <section className="mb-32 text-center lg:text-left">
          <Slider {...settings}>
            <div>
              <div className=" grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                    <h2 className="mb-6 text-3xl font-bold">Schedule Management</h2>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                      Seamlessly organize and optimize your counseling sessions with our intuitive
                      scheduling system. Maximize your time and focus on what truly matters—providing
                      exceptional care to students.
                    </p>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0">
                  <img
                    src={Dashboard}
                    className="w-full rounded-lg shadow-lg scale-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                    <h2 className="mb-6 text-3xl font-bold">Record Keeping</h2>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                        Store and access historical counseling records with ease. 
                        Our system ensures the confidentiality and integrity of your data, 
                        empowering you to track progress and provide the best possible care.
                    </p>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0">
                  <img
                    src={RecordKeeping}
                    className="w-full rounded-lg shadow-lg scale-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                    <h2 className="mb-6 text-3xl font-bold">Blog Section</h2>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                        Explore a wealth of resources in our blog section, dedicated 
                        to highlighting the transformative power of counseling. Stay 
                        informed, inspired, and engaged as we share insights, tips, 
                        and success stories.
                    </p>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0">
                  <img
                    src={Blog}
                    className="w-full rounded-lg shadow-lg scale-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" grid items-center lg:grid-cols-2">
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0 2px 15px -3px rgba(0,0,0,0.07),0 10px 20px -2px rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                    <h2 className="mb-6 text-3xl font-bold">Parent/Student Space</h2>
                    <p className="mb-8 text-neutral-500 dark:text-neutral-300">
                        Foster meaningful connections between students, parents, and 
                        counselors. Our platform facilitates open communication and 
                        collaboration, ensuring everyone is on the same page for student 
                        success.
                    </p>
                  </div>
                </div>
                <div className="md:mb-12 lg:mb-0">
                  <img
                    src={Space}
                    className="w-full rounded-lg shadow-lg scale-100"
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* Add more slides here */}
          </Slider>
          
        </section>
        {/* Section: Design Block */}
        
      </div>
      {/* <img
        src={backgroundWaves2}
        className="absolute bottom-0 right-0 hidden w-full lg:block"
        alt="background shape"
      >
      </img> */}
      {/* Container for demo purpose */}
    </>
  );
};
