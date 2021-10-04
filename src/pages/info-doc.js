import React, { Component } from "react";
import marked from "marked";

class InfoDocPage extends Component {
  constructor() {
    super();
    this.state = { markdown: "" };
  }

  componentDidMount() {
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    const readmePath = require("../../src/markdown.md");

    fetch(readmePath)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({
          markdown: marked(text)
        });
      });
  }
  render() {
    const { markdown } = this.state;

    return (
      <section>
        <article dangerouslySetInnerHTML={{ __html: markdown }}></article>
      </section>
    );
  }
}
export default InfoDocPage;
