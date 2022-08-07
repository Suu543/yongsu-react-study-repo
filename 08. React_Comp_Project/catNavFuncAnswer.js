// Function Version
function CatNav(props) {
  return (
    <li className="cat-link left valign-wrapper">
      <i className="material-icons">{props.data.icon}</i>
      {props.data.title}
    </li>
  );
}

function NavLinks(props) {
  return (
    <div className="row">
      <ul className="cat-nav center-align">
        {props.data.map((link, i) => {
          return <CatNav key={i} data={link} />;
        })}
      </ul>
    </div>
  );
}
