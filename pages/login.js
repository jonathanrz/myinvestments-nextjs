import Layout from "../components/MyLayout.js";
import Router from "next/router";
import Cookie from "js-cookie";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ token: event.target.value });
  }

  handleSubmit(event) {
    Cookie.set("token", this.state.token);
    Router.push(`/`);
    event.preventDefault();
  }

  render() {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <label>
            Token:
            <input
              type="text"
              name="token"
              value={this.state.token}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Layout>
    );
  }
}

export default Index;
