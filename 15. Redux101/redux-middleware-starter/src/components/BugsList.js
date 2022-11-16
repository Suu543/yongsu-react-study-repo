import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);
  console.log("bugs: ", bugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <div key={bug.id}>
          <li>{bug.description}</li>
          <button onClick={() => dispatch(resolveBug(bug.id))}>Resolve</button>
        </div>
      ))}
    </ul>
  );
};

export default BugsList;
// https://bgpark.tistory.com/124
