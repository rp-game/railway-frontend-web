import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("browse", "routes/browse.tsx"),
  route("cart", "routes/cart.tsx"),
  route("trains", "routes/trains._index.tsx"),
  route("trains/:trainCode", "routes/trains.$trainCode.tsx"),
] satisfies RouteConfig;
