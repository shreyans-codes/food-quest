import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { SplideSlide } from "@splidejs/react-splide";
import React from "react";

const RecipeCard = ({ item }) => {
  return (
    <Card
      key={item.key}
      sx={{
        width: 345,
        height: 350,
        overflow: "hidden",
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

export default RecipeCard;
