function Card(props) {
  return (
    <div>
      <div>
        <img src={props.card.image} alt={props.card.instructor} />
      </div>

      <div>
        <p>{props.card.course}</p>
        <p>{props.card.instructor}</p>
      </div>

      <div>
        <a href="#">$9.99</a>
      </div>
    </div>
  );
}

export default Card;
