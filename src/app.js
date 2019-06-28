import React from "react";
import Carousel from "./components/carousel";

let no_of_slides = 10;
let titles = [];
const App = () => {
  for (let i = 0; i < no_of_slides; i++) {
    titles.push(`Title ${i + 1}`);
  }
  return (
    <div>
      <Carousel titles={titles} no_of_slides={no_of_slides} />
    </div>
  );
};

export default App;
