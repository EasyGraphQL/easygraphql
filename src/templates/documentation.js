import React from "react";
import Helmet from "react-helmet";
import Header from "../components/Header";
import Link from "gatsby-link";
import { pickBy, mapKeys, pick, identity } from "lodash";
import styled, { injectGlobal } from "styled-components";
import Nav from "../components/docs/Nav";
import Sidebar from "../components/docs/Sidebar";

const Documentation = styled.main`
  float: left;
  width: 60%;
  margin-left: 20%;
  padding: 2em 4em;

  @media ${props => props.theme.mobile} {
    width: 100%;
    margin: 0;
  }
`;

const DocContents = styled.div`
  /**
   * Code 💻
   */
  code {
    background: #f4f7fb;
    padding: 0 0.25em;
    font-size: 0.95em;
    border-radius: 3px;
    font-family: ${props => props.theme.monspace};
  }

  .gatsby-highlight pre {
    background: #f9fbfd;
    border: 1px solid #ececec;
    border-radius: 3px;
    padding: 0.5em 1em;
    overflow: auto;
    margin: 0 0 1em 0;
  }

  .gatsby-highlight code {
    background: none;
    color: inherit;
    padding: 0;
    border-radius: 0;
  }

  /**
   * Tables 
   */
  table {
    border: 1px solid #ececec;
    overflow: hidden;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    margin: 1em 0;
    border-radius: 3px;
  }

  th {
    font-weight: 600;
  }

  h3 {
    margin: 0.5em 0;
  }

  th:empty {
    display: none;
  }

  td,
  th {
    text-align: left;
    padding: 0.375em 0.75em 0.375em 0.75em;
  }

  td {
    line-height: 1.75em;
    vertical-align: top;
  }

  .bordered-table table {
    border-width: 0 1px 1px 0;
  }

  .bordered-table td,
  .bordered-table th {
    border: 1px solid #ececec;
    border-right: 0;
    border-bottom-width: 0;
  }

  .fixed-table table {
    table-layout: fixed;
  }

  .attributes-table td {
    line-height: 1.5em;
  }

  .attributes-table td:first-child {
    text-align: right;
    line-height: 1em;
  }

  .attributes-table strong {
    white-space: nowrap;
  }

  small {
    color: #888;
    display: block;
    margin-top: 0.25em;
    font-size: 0.875em;
    font-weight: 400;
    line-height: 1em;
  }

  img {
    display: block;
    margin: 2rem auto;
    max-width: 600px;
    width: 98%;
  }
`;

const DocHeader = styled.header`
  padding: 0 0 0.25em 0;
  margin-bottom: 1.5em;
  border-bottom: 2px solid #f0f0f0;

  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
`;

export default ({ pathContext, location }) => {
  const { page, nav } = pathContext;
  const description = page.frontmatter.description ? (
    <p>{page.frontmatter.description}</p>
  ) : (
    ""
  );

  const extras = pickBy(
    mapKeys(
      pick(page.frontmatter, ["tests", "issues", "edit"]),
      (href, text) => {
        switch (text) {
          case "tests":
            return "Litmus Tests";

          case "issues":
            return "Report a Bug";

          case "edit":
            return "Edit this Page";
        }
      }
    ),
    identity
  );

  return (
    <div>
      <Helmet>
        <title>{page.frontmatter.title}</title>
        <script>
          dangerouslySetInnerHTML=
          {{
            __html: `
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
          `
          }}
        </script>
      </Helmet>
      <Header currentPath={location.pathname} fixed />
      <Nav nav={nav} currentPath={location.pathname} />
      <Documentation>
        <DocHeader>
          <h1>{page.frontmatter.title}</h1>
          {description}
        </DocHeader>
        <DocContents dangerouslySetInnerHTML={{ __html: page.html }} />
      </Documentation>
      <Sidebar headings={page.headings} extras={extras} />
    </div>
  );
};
