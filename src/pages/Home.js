import React from "../../_snowpack/pkg/react.js";
import Card from "../components/Card.js";
import {RestaurantListContext} from "../contexts/RestaurantListContext.js";
function Home() {
  return /* @__PURE__ */ React.createElement(RestaurantListContext.Consumer, null, ({data, setQuery, setOrder, setSortBy, order, sortBy}) => /* @__PURE__ */ React.createElement("div", {
    className: "home"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "search"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "search",
    onChange: (event) => {
      (event2) => {
        setQuery(event2.target.value);
      };
    },
    placeholder: "Search by Brand",
    name: "search"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "orderForm"
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "sortBy"
  }, "Sort by:"), /* @__PURE__ */ React.createElement("select", {
    name: "sortBy",
    onChange: (event) => {
      setSortBy(event.target.value);
    },
    value: sortBy
  }, /* @__PURE__ */ React.createElement("option", {
    value: ""
  }, "-"), /* @__PURE__ */ React.createElement("option", {
    value: "Stars"
  }, "Stars"), /* @__PURE__ */ React.createElement("option", {
    value: "Brand"
  }, "Brand"), /* @__PURE__ */ React.createElement("option", {
    value: "Country"
  }, "Country")), /* @__PURE__ */ React.createElement("select", {
    name: "order",
    onChange: (event) => {
      setOrder(event.target.value);
    },
    value: order
  }, /* @__PURE__ */ React.createElement("option", {
    value: "asc"
  }, "Asc"), /* @__PURE__ */ React.createElement("option", {
    value: "desc"
  }, "Desc")))), /* @__PURE__ */ React.createElement("div", {
    className: "card-list"
  }, data?.map((card, index) => /* @__PURE__ */ React.createElement(Card, {
    key: card.Brand + index,
    ...card
  })))));
}
export default Home;
