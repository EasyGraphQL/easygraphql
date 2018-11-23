'use strict';

const path = require('path');

exports.modifyWebpackConfig = ({ config, stage }) => {
  config._config.node.fs = 'empty'

  if (stage === 'build-html') {
    config.loader('null', {
      test: /react-ace/,
      loader: 'null-loader'
    })
  }
}

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators;

  const documentationTemplate = path.resolve(`src/templates/documentation.js`);
  const redirectTemplate = path.resolve(`src/templates/redirect.js`);

  return graphql(`{
    allMarkdownRemark(
      limit: 1000,
      sort: { order:ASC, fields: fileAbsolutePath },
      filter: { fileAbsolutePath: { regex: "/\/docs\//" } }
    ) {
      edges {
        node {
          fileAbsolutePath
          html
          headings {
            value
            depth
          }
          frontmatter {
            title
          }
        }
      }
    }
  }`)
    .then(result => {
      if (result.errors) {
        // tests
            // issues
        // console.log(result.errors)
        // return Promise.reject(result.errors);
      }
      
      let nav = [];

      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.fileAbsolutePath.indexOf('index') > 0) {
          const parent = { title: node.frontmatter.title, children: [], redirectFrom: getDocPath(node) };
          
          nav.push(parent);
        }
        else {
          const parent = nav[nav.length - 1];
          if (!parent.path) {
            parent.path = getDocPath(node);
          }

          parent.children.push({ title: node.frontmatter.title, path: getDocPath(node) });
        }
      });

      result.data.allMarkdownRemark.edges
        .forEach(({ node }, i) => {
          if (node.fileAbsolutePath.indexOf('index') > 0) {
            createPage({
              path: getDocPath(node),
              component: redirectTemplate,
              context: { to: getDocPath(result.data.allMarkdownRemark.edges[i+1].node) }
            })
          }
          else {
            createPage({
              path: getDocPath(node),
              component: documentationTemplate,
              context: { page: node, nav }
            })
          }
      });
    });
}


function getDocPath({ fileAbsolutePath }) {
  const ext = path.extname(fileAbsolutePath);
  const file = stripOrderingNumbers(path.basename(fileAbsolutePath, ext));
  const dir = stripOrderingNumbers(path.dirname(fileAbsolutePath).split(path.sep).pop());

  return `/docs/${dir}${file === 'index' ? '' : `/${file}`}`;
}

function stripOrderingNumbers(str) {
  return str.replace(/^(\d+-)/, '');
}