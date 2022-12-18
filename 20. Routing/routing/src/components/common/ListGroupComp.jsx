import ListGroup from "react-bootstrap/ListGroup";

const ListGroupComp = (props) => {
  const { items, valueProperty, textProperty, onItemSelect, selectedItem } =
    props;

  // console.log("items: ", items);

  return (
    <ListGroup>
      {items.map((item) => (
        <ListGroup.Item
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          active={item === selectedItem}
        >
          {item[textProperty]}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

ListGroupComp.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroupComp;
