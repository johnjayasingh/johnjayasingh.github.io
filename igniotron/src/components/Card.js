import React from "../../_snowpack/pkg/react.js";
import LazyLoad from "../../_snowpack/pkg/react-lazyload.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
export default function Card(props) {
  const stars = [];
  for (let star = 0; star < 5; star++) {
    stars.push(/* @__PURE__ */ React.createElement("span", {
      key: props.Stars + props.Brand + star,
      className: star <= props.Stars - 1 ? "fa fa-star checked" : "fa fa-star-o"
    }));
  }
  let performer = /* @__PURE__ */ React.createElement("div", null);
  if (props?.["Top Ten"] !== "NaN") {
    performer = /* @__PURE__ */ React.createElement("div", null);
  }
  return /* @__PURE__ */ React.createElement(Link, {
    className: "card",
    to: `${props.Key}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container"
  }, /* @__PURE__ */ React.createElement("h5", null, props?.Brand), /* @__PURE__ */ React.createElement("p", null, props?.Variety), /* @__PURE__ */ React.createElement(LazyLoad, {
    placeholder: /* @__PURE__ */ React.createElement("img", {
      className: "lazy",
      src: "/loader-preview.png",
      alt: "preview"
    })
  }, /* @__PURE__ */ React.createElement("img", {
    className: "lazy",
    height: 200,
    width: "100%",
    src: props.Image,
    alt: props.Brand
  })), /* @__PURE__ */ React.createElement("div", {
    className: "info"
  }, /* @__PURE__ */ React.createElement("img", {
    className: "flag",
    src: `
      https://www.countries-ofthe-world.com/flags-normal/flag-of-${props.Country?.replace(" ", "-")}.png
      `,
    onError: (event) => {
      if (event.target.src != "error.jpg")
        event.target.src = "https://www.countries-ofthe-world.com/flags-normal/flag-of-Japan.png";
    },
    height: 20,
    alt: props.Country
  }), /* @__PURE__ */ React.createElement("div", {
    className: "stars"
  }, stars)), performer));
}
