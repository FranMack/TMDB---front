import React, { useRef, useState } from "react";
import CardScrollH from "../commos/cardScrollH";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function HorizontalScroll({ movies }) {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (scrollDirection) => {
    const scrollAmount = 200; // Ajusta según tus necesidades
    const container = scrollContainerRef.current;

    if (container) {
      if (scrollDirection === "left") {
        container.scrollLeft -= scrollAmount;
        setScrollPosition(container.scrollLeft);
      } else {
        container.scrollLeft += scrollAmount;
        setScrollPosition(container.scrollLeft);
      }
    }
  };

  const location = useLocation().pathname.slice(1) || "movie";
  console.log("location", location);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="horizontal-scroll-container" ref={scrollContainerRef}>
        <div className="image-list">
          {movies.map((movie, i) => (
            <Link to={`/${location}/${movie.id}`} key={i}>
              <CardScrollH movie={movie} />
            </Link>
          ))}
        </div>
      </div>
      <ArrowBackIosNewIcon
        sx={{
          fontSize: "4rem",
          position: "absolute",
          top: "40%",
          left: "30px",
          "&:hover": { color: "#f7a102" },
        }}
        onClick={() => handleScroll("left")}
      />
      <ArrowForwardIos
        sx={{
          fontSize: "4rem",
          position: "absolute",
          top: "40%",
          right: "30px",
          "&:hover": { color: "#f7a102" },
        }}
        onClick={() => handleScroll("right")}
      />
    </div>
  );
}

export default HorizontalScroll;
