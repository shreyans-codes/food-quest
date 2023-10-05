import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import React from "react";
import { SaveAlt } from "@mui/icons-material";
import myHeaders from "../variables/myHeaders";

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

  fetch("http://localhost:8080/api/recipe", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const SearchCard = ({ item }) => {
  return (
    <Card
      key={item.key}
      sx={{
        width: 345,
        maxHeight: 350,
        overflow: "hidden",
        margin: "2px 8px",
      }}
    >
      <CardMedia
        sx={{ height: 140, p: "2px" }}
        image={item.image}
        title={"Photo: " + item.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <div dangerouslySetInnerHTML={{ __html: item.summary }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

const SearchResult = ({ items }) => {
  return (
    <div>
      <Typography
        variant="h3"
        style={{
          marginLeft: "3rem",
        }}
      >
        Search Results
      </Typography>
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
              <div>
                <SearchCard item={itemSet} key={item.id} />
                <Button
                  sx={{
                    marginLeft: "0.7em",
                  }}
                  onClick={() => saveData(itemSet)}
                  startIcon={<SaveAlt />}
                >
                  Save
                </Button>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};

export default SearchResult;
