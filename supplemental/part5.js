class Component {
  componentDidMount() {}

  render() {}
}

class Navbar extends Component {
  constructor() {
    this.state = {};
  }

  render() {
    console.log("Im running in the DOM!");
  }
}

const myNavbar = new Navbar();
console.log(myNavbar);
myNavbar.render();
