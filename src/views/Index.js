import React from "react";
import { Routes, Route } from "react-router-dom";

// reactstrap components

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";

// index page sections
import Hero from "./IndexSections/Hero.js";
import HomeDestinationcard from "./IndexSections/HomeDestinationcard.js";
import Homeoffercards from "./IndexSections/Homeoffercards.js";
import HomeDestinationslider from "./IndexSections/HomeDestinationslider.js";
import Footer from "./IndexSections/Footer.js";
import FloatIcon from "./IndexSections/Floaticon.js";
import AgentRegistration from "./IndexSections/AgentRegistration";

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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <HomeDestinationcard />
                  <HomeDestinationslider />
                  <Homeoffercards />
                </>
              }
            />
            <Route path="/agent-registration" element={<AgentRegistration />} />
          </Routes>
          <Footer />
          <FloatIcon />
        </main>
      </>
    );
  }
}
export default Index;
