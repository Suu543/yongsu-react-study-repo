import { Component } from "react";
import http from "./services/httpService";
import { ToastContainer, toast } from "react-toastify";
import config from "./config.json";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) or rejected (failure)
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    console.log("Update");
    // PUT (Enter post object) vs PATCH (Update only 1 or 2 properties)
    // const { data } = await axios.patch(apiEndpoint + "/" + post.id, {
    //   title: post.title,
    // });

    post.title = "UPDATED";
    const { data } = await http.put(config.apiEndpoint + "/" + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);

    posts[index] = { ...post };
    this.setState({ posts });
    console.log(data);
  };

  handleDelete = async (post) => {
    const originalPost = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    console.log("Delete");

    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      console.log("HANDLE DELETE CATCH BLOCK");

      if (ex.response && ex.response.status === 404) {
        toast("This post has already been deleted.");
      }

      this.setState({ posts: originalPost });
    }
  };

  render() {
    return (
      <div className="container mt-5">
        <ToastContainer />

        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
