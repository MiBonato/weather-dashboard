import React, { useState } from 'react';

const loaderImages = [
    "clear-day.svg",
    "clear-night.svg",
    "drizzle.svg",
    "hail.svg",
    "mist.svg",
    "overcast.svg",
    "rain.svg",
    "snow.svg",
    "thermometer.svg",
    "thunderstorms.svg",
    "uv-index.svg",
    "windsock.svg",
];

export const LoaderSmallScreen = () => {
    const [randomImage] = useState(() => {
      const index = Math.floor(Math.random() * loaderImages.length);
      return loaderImages[index];
    });

    return (
        <div className="weatherItem flex w-100 m-w-50 l-w-33">
            <div className="fadeInFromLeft w-100 flex jc-center ai-center">
                <img src={randomImage} alt="loading" />
            </div>
        </div>
    );
};
