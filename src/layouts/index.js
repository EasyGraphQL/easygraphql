import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import classnames from "classnames";
import styled, { ThemeProvider } from "styled-components";

import "../styles.css";

const theme = {
  monospace: `'Source Code Pro', monospace`,
  tablet: `only screen and (max-width: 800px)`,
  mobile: `only screen and (max-width: 650px)`,
  colors: {
    primary: "#2097e4",
    text: "#333"
  }
};

const DefaultLayout = ({ children }) => (
  <div>
    <Helmet>
      <title>EasyGraphQL</title>
    </Helmet>
    <ThemeProvider theme={theme}>{children()}</ThemeProvider>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.func
};

export default DefaultLayout;
