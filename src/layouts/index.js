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
      <script>
        {(function(o, w, l, a, m) {
          o["owl"] =
            o["owl"] ||
            function() {
              (o["owl"].q = o["owl"].q || []).push(arguments);
            };
          (a = w.createElement("script")),
            (m = w.getElementsByTagName("head")[0]);
          o.__owlSettings = { owlId: "be26ab47cfb0" };
          a.async = 1;
          a.src = l;
          m.parentNode.insertBefore(a, m);
        })(window, document, "https://static.owlsights.com/min.index.js")}
      </script>
    </Helmet>
    <ThemeProvider theme={theme}>{children()}</ThemeProvider>
  </div>
);

DefaultLayout.propTypes = {
  children: PropTypes.func
};

export default DefaultLayout;
