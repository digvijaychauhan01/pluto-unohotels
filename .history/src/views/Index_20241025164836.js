import React from "react";

// reactstrap components


// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";


// index page sections
import Hero from "./IndexSections/Hero.js";
import HomeDestinationcard from "./IndexSections/HomeDestinationcard.js";
import Homeoffercards from "./IndexSections/Homeoffercards.js";
import HomeDestinationslider from "./IndexSections/HomeDestinationslider.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Hero />
          <HomeDestinationcard />
          <HomeDestinationslider />
          <Homeoffercards />
        </main>
      </>
    );
  }
}

export default Index;
