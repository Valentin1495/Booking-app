import { GoogleMap, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Information from "../components/Information";
import Input from "../components/Input";
import { MapOptions } from "../model";
import { setCenter, setCurrentLocation } from "../slices/navigationSlice";
import { RootState } from "../store";

const Places = () => {
  const dispatch = useDispatch();

  const center = useSelector((state: RootState) => state.navigation.center);
  const currentLocation = useSelector(
    (state: RootState) => state.navigation.currentLocation
  );

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          dispatch(setCenter(pos));
          dispatch(setCurrentLocation(pos));
        }
      );
    }
  }, []);

  return (
    <div className="h-screen flex flex-col-reverse md:flex-row">
      <Information />

      <div className="md:w-[70%] md:h-full w-full h-1/2 relative">
        <Input />

        {center ? (
          <GoogleMap
            mapContainerClassName="h-full"
            center={center}
            zoom={16}
            options={options}
          >
            {currentLocation && <MarkerF position={currentLocation} />}
          </GoogleMap>
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl lg:text-5xl">
            Loading a Map...
          </p>
        )}
      </div>
    </div>
  );
};

export default Places;