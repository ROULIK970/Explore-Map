"use client";
import React, { useState, useEffect } from "react";
import L from "leaflet";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import "leaflet/dist/leaflet.css";

const Map = () => {
  const [countryDetails, setCountryDetails] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewCountry, setViewCountry] = useState([0, 0], 2);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${searchQuery}`
      );

      setCountryDetails(response.data[0]);

      //setViewCountry([countryDetails.latlng[0], countryDetails.latlng[1]], 4);
    } catch (error) {
      alert("Pick a valid country");
    }
  };

  const fetchCountryDetails = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${countryCode}`
      );

      const countryDetails = response.data[0];
      setCountryDetails(countryDetails);
      console.log(countryDetails)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCountryClick = async (e) => {
    const latitude = e.latlng.lat;
    const longitude = e.latlng.lng;

    try {
      const response = await axios.get(
        `https://secure.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=roulik`
      );
      const countryCode = response.data.countryCode;
      fetchCountryDetails(countryCode);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const countryCode = e.target.feature.properties.iso_a2;
  // fetchCountryDetails(countryCode);

  useEffect(() => {
    
      const map = L.map("map").setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(map);
      map.on("click", handleCountryClick);
    
    
  }, []);

  

  return (
    <section className="main-content" style={{ height: "100vh" }}>
      <div className="search" >
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          className="search-input"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={handleSearchClick}
          className="search-icon"
        />
      </div>
      <div className="map-details">
        <div
          className="map"
          id="map"
          style={{ height: "800px", width: "800px" }}
        />
        {countryDetails && (
          <div className="country-details">
            <img
              className="country-flag"
              src={countryDetails.flags.png}
              alt={countryDetails.flags.alt}
            />
            <h2 className="details-h2">Country Details</h2>
            <p>Name: {countryDetails.name.common}</p>
            <p>Capital: {countryDetails.capital}</p>
            <p>Population: {countryDetails.population}</p>
            <p>
              Language:{" "}
              {Object.values(countryDetails.languages).map((x) => x)}
            </p>
            <p>
              Currency:{" "}
              {Object.values(countryDetails.currencies).map((x) => x.name)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Map;
