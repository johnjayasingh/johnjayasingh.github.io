import React from "../_snowpack/pkg/react.js";
import Home from "./pages/Home.js";
import restaurants from "./data/restaurants.json.proxy.js";
import images from "./data/images.json.proxy.js";
import {RestaurantListContext} from "./contexts/RestaurantListContext.js";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "../_snowpack/pkg/react-router-dom.js";
import Detail from "./pages/Detail.js";
function App() {
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [order, setOrder] = React.useState("asc");
  React.useEffect(() => {
    const _data = restaurants?.map((restaurant, index) => {
      return {
        Key: `${index}`,
        ...restaurant,
        ...images[index % images.length]
      };
    })?.filter((restaurant) => {
      if (query?.length > 0) {
        return restaurant?.Brand?.toLowerCase()?.includes(query?.toLowerCase());
      }
      return true;
    })?.sort((a, b) => {
      if (!sortBy) {
        return 0;
      }
      if (a[sortBy] < b[sortBy]) {
        return order === "desc" ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return order === "desc" ? 1 : -1;
      }
      return 0;
    });
    setData(_data);
  }, [query, sortBy, order]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement(RestaurantListContext.Provider, {
    value: {
      data,
      setQuery,
      sortBy,
      setSortBy,
      order,
      setOrder
    }
  }, /* @__PURE__ */ React.createElement(Router, null, /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/:id",
    component: Detail
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    component: Home
  })))));
}
export default App;
