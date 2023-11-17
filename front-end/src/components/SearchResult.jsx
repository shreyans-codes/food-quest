import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";
import myHeaders from "../variables/myHeaders";
import BASE_URL from "../variables/base_url";

const saveData = (item) => {
  var searchHeader = myHeaders;
  var raw = JSON.stringify({
    title: item.title,
    description: item.summary,
    imageUrl: item.image,
  });
  console.log(raw);

  var requestOptions = {
    method: "POST",
    headers: searchHeader,
    body: raw,
    redirect: "follow",
  };

  fetch(BASE_URL + "/recipe", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const SearchCard = ({ item }) => {
  return (
    <div
      className="card bg-base-100 shadow-xl"
      style={{ width: 345, height: 300, overflow: "hidden" }}
    >
      <figure style={{ minHeight: "140px", maxHeight: "140px" }}>
        <img src={item.image} alt={item.title} title={"Photo: " + item.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <div className="card-actions justify-end">
          <button
            className="btn btn-outline btn-accent"
            onClick={() => saveData(item)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchResult = ({ items }) => {
  return (
    <div>
      <article className="prose ml-12">
        <h1>Search Results</h1>
      </article>
      <Splide
        tag="section"
        options={{
          perPage: 4,
          drag: "free",
          arrows: true,
          pagination: false,
          padding: "3rem",
          gap: "5rem",
          hasTrack: false,
        }}
      >
        {items.map((item) => {
          const itemSet = {
            title: item["title"],
            image: item["image"],
            summary: item["summary"],
          };
          console.log(item.name);
          return (
            <SplideSlide key={item.id}>
              <SearchCard item={itemSet} key={item.id} />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default SearchResult;
