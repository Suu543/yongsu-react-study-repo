import { useLocation, NavLink } from "react-router-dom";

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  console.log("location: ", location);
  return <NavLink to={to + location.search} {...props} />;
}

export default QueryNavLink;
