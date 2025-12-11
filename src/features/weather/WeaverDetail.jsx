import React from 'react';
import { getWeatherIconName } from '../utils/weatherIcons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getWindSpeedToBeaufort } from '../utils/windforce'
import { getTemperatureCategory } from '../utils/temperature'
import { getUvIndexLevel } from '../utils/uvindex'
import { getCloudCover } from '../utils/cloudCover'

export const WeatherDetail = ({ hourly, daily, currentTime }) => {
  if (!hourly || !hourly.time) {
    return <div className="">Aucune prévision disponible.</div>;
  }

  const slides = [];

  const referenceDate = new Date(currentTime);
  const nextFullHour = new Date(referenceDate);
  nextFullHour.setMinutes(0, 0, 0);
  if (referenceDate.getMinutes() > 0) {
    nextFullHour.setHours(nextFullHour.getHours() + 1);
  }

  let startIndex = hourly.time.findIndex(t => {
    const date = new Date(t);
    return date.getTime() === nextFullHour.getTime();
  });

  if (startIndex === -1) {
    startIndex = 0;
  }

  const data24h = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
    const globalIndex = startIndex + index;
    return {
      time,
      temperature: hourly.temperature_2m[globalIndex],
      weathercode: hourly.weathercode[globalIndex],
      windspeed: hourly.windspeed_10m[globalIndex],
      precipitation: hourly.precipitation[globalIndex],
      cloudcover: hourly.cloudcover[globalIndex],
      isDay: hourly.is_day[globalIndex],
      uv_index: hourly.uv_index[globalIndex],
    };
  });

  const sunrise = daily.sunrise[0].substring(11)
  const sunriseHour = daily.sunrise[0].substring(11, 13)
  const sunset = daily.sunset[0].substring(11)
  const sunsetHour = daily.sunset[0].substring(11, 13)

  data24h.map((data) => {
    const iconName = getWeatherIconName(data.weathercode, data.isDay);
    const formattedTime = data.time.substring(11);
    const currentHour = data.time.substring(11, 13);
    const iconWind = getWindSpeedToBeaufort(data.windspeed);
    const iconTemperature = getTemperatureCategory(data.temperature);
    const iconUvs = getUvIndexLevel(data.uv_index);
    const iconCover  = getCloudCover(data.cloudcover, data.isDay);

    slides.push(
      <SwiperSlide key={`hour-${data.time}`}>
        <div>
          <div className="timeStamp">{formattedTime}</div>
          <div className="weatherDetailMain">
            <img
              src={`${iconName.src}.svg`}
              alt={iconName.alt}
              width="48"
              height="48"
            />
          </div>
          <div className="weatherDetailHours flex s-col">
            <div className="w-100 flex s-row jc-center">
              <div className="w-50 flex jc-end">
                <img src={`${iconTemperature.src}.svg`} alt={`${iconTemperature.alt}`} width="30" height="30" />
              </div>
              <div className="w-50">{data.temperature}°C</div>
            </div>

            <div className="w-100 flex s-row jc-center">
              <div className="w-50 flex jc-end">
                <img src={`${iconCover.src}.svg`} alt={`${iconCover.alt}`} width="30" height="30" />
              </div>
              <div className="w-50">{data.cloudcover}%</div>
            </div>

            <div className="w-100 flex s-row jc-center">
              <div className="w-50 flex jc-end">
                {data.isDay ? <img src={`${iconUvs.src}.svg`} alt={`${iconUvs.alt}`} /> : <img src="starry-night.svg" alt="Nuit - pas d'UV" /> }
              </div>
              <div className="w-50">{data.uv_index}UV</div>
            </div>

            <div className="w-100 flex s-row jc-center">
              <div className="w-50 flex jc-end">
                <img src={`${iconWind.src}.svg`} alt={`${iconWind.alt}`} width="30" height="30" />
              </div>
              <div className="w-50">{data.windspeed}km/h</div>
            </div>

            <div className="w-100 flex s-row jc-center">
              <div className="w-50 flex jc-end">
                <img src="raindrop.svg" alt="pluie en milimètre" width="30" height="30" />
              </div>
              <div className="w-50">{data.precipitation}mm</div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    )

    if (currentHour === sunriseHour) {
      slides.push(
        <SwiperSlide key={`sunrise-${data.time}`}>
          <div>
            <div className="timeStamp">{sunrise}</div>
            <div className="weatherDetailMain">
              <img
                src="sunrise.svg"
                alt="lever du soleil"
                width="48"
                height="48"
              />
            </div>
            <div className="weatherDetailHours sunrise flex s-col">
              <div className="arrow">
                <img
                  src="pressure-high-arrows.svg"
                  alt="pressure-high-arrows"
                  width="48"
                  height="48"
                />
              </div>
              <div>lever</div>
            </div>
          </div>
        </SwiperSlide>
      )
    }

    if (currentHour === sunsetHour) {
      slides.push(
        <SwiperSlide key={`sunset-${data.time}`}>
          <div>
            <div className="timeStamp">{sunset}</div>
            <div className="weatherDetailMain">
              <img
                src="sunset.svg"
                alt="coucher du soleil"
                width="48"
                height="48"
              />
            </div>
            <div className="weatherDetailHours sunset flex s-col">
              <div className="arrow">
                <img
                  src="pressure-low-arrows.svg"
                  alt="pressure-low-arrows"
                  width="48"
                  height="48"
                />
              </div>
              <div>coucher</div>
            </div>
          </div>
        </SwiperSlide>
      )
    }
  })

  // Config autoplay 
  /*const autoplayConfig = {
    delay: 4000,          //
    disableOnInteraction: true,
    pauseOnMouseEnter: true,
  };*/

  return (
    <div className="weatherDetail">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation       // flèches par défaut Swiper
        autoplay={false} // false pour désactiver
        loop={false}
        slidesPerView={2}
        spaceBetween={0}
        breakpoints={{
          425: { slidesPerView: 3, spaceBetween: 0 },
          768: { slidesPerView: 3, spaceBetween: 0 },
          1200: { slidesPerView: 4, spaceBetween: 0 },
        }}
      >
        {slides}
      </Swiper>
    </div>
  )
}
