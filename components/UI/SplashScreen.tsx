import React from "react";
import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 h-screen flex justify-center items-center bg-secondary z-[999] animate-fadeOut">
      <Image
        src="/assets/icons/logo.png"
        alt="메인 로고"
        width={200}
        height={200}
      />
    </div>
  );
};

export default SplashScreen;
