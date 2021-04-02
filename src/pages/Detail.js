import React from "../../_snowpack/pkg/react.js";
import {useParams, Redirect, Link} from "../../_snowpack/pkg/react-router-dom.js";
import CardDetail from "../components/CardDetail.js";
import {RestaurantListContext} from "../contexts/RestaurantListContext.js";
function Detail() {
  let {id} = useParams();
  const {data} = React.useContext(RestaurantListContext);
  console.log(data, id);
  const restaurant = data?.find((restaurant2) => restaurant2.Key === id);
  if (!restaurant) {
    return /* @__PURE__ */ React.createElement(Redirect, {
      to: "/"
    });
  }
  console.log(restaurant);
  return /* @__PURE__ */ React.createElement("div", {
    className: "detail"
  }, /* @__PURE__ */ React.createElement(Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "fa fa-long-arrow-left back"
  })), /* @__PURE__ */ React.createElement(CardDetail, {
    ...restaurant
  }));
}
export default Detail;
