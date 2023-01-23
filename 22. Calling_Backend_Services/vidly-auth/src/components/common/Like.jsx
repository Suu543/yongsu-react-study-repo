import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

// Input: liked: boolean
// Output: onClick

const Like = (props) => {
  let icon = props.liked ? fullHeart : emptyHeart;
  return (
    <FontAwesomeIcon
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      icon={icon}
    />
  );
};

export default Like;
