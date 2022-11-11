import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDestination } from "../slices/reservationSlice";

const SearchInput = () => {
  const {
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const destination = useSelector(
    (state: RootState) => state.reservation.destination
  );
  const dispatch = useDispatch();

  return (
    <div
      className="space-y-5 absolute w-full top-5 left-1/2 -translate-x-1/2 
      "
    >
      <p className="w-full px-5 truncate leading-loose">
        <span className="text-2xl italic font-light">Your destination is</span>
        <br />
        <span className="text-3xl font-bold text-[#FF385C]">
          {destination ? destination : "..."}
        </span>
      </p>
      <div className="w-1/2 absolute left-1/2 -translate-x-1/2">
        <Combobox
          value={""}
          onChange={(place) => dispatch(setDestination(place))}
        >
          <Combobox.Input
            className="bg-gray-200 w-full rounded-lg border-none font-bold outline-none p-2 text-lg text-gray-900"
            placeholder="Search destinations"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            autoFocus
            required
          />
          <Combobox.Options className="outline-none mt-1 max-h-60 overflow-auto rounded-md bg-white">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <Combobox.Option
                  key={place_id}
                  value={description}
                  className="truncate select-none font-bold outline-none py-2 px-4 ui-active:bg-[#FF385C]
                             ui-active:text-white"
                >
                  {description}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
};

export default SearchInput;