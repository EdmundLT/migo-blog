import React from "react";
import Banner from "../components/Banner";
import "styles/globals.css";
import Footer from "../components/Footer";
import Image from "next/image";
const about = () => {
  return (
    <div className="max-w-full mx-auto bg-white">
      <div className="max-w-7xl mx-auto">
        <Banner />

        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
              <h1 className="text-2xl lg:text-3xl leading-9 text-gray-800 dark:text-black pb-4">
                關於我們
              </h1>
              <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
                這個 Blog
                主要記載我們在加拿大的生活、工作、唸書以及分享一些職場資訊。我們希望透過文字來紀錄這個移民的過程，讓有需要的朋友可以參考。
              </p>
            </div>
            <div className="w-full lg:w-8/12">
              <Image
                className="rounded-lg shadow-lg"
                width={640}
                height={150}
                src="/images/otto.webp"
                alt="Otto"
              />
            </div>
          </div>

          <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full flex flex-col justify-center gap-y-2">
              <h1 className="text-2xl lg:text-3xl leading-9 text-gray-800 dark:text-black pb-4">
                我們的故事
              </h1>
              <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
                我們是一對情侶，在 2021
                年離開香港移民到加拿大，目前在多倫多生活。男生目前是加拿大某一間銀行的軟體工程師，女生則是廣告公司的數據分析師。
              </p>
              <p className="font-normal text-base leading-6 text-gray-600 dark:text-black">
                至於這個 Blog 的名字為什麼是 Otto
                呢？是因為我們養的小貓咪就叫這個名字 ：）
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
