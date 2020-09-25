import React from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      newFriend: [
        {
          id: Date.now(),
          name: "",
          email: "",
          age: "",
        },
      ],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log("friendslist get res", res.data);
        this.setState({
          friends: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  formatData = () => {
    const formattedData = [];
    console.log(this.state.friends);
    this.state.friends.forEach((friend) => {
      formattedData.push({
        id: friend.id,
        name: friend.name,
        email: friend.email,
      });
    });
    return formattedData;
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("value", e.target.value);
    axiosWithAuth()
      .post("/api/friends", {
        id: this.state.newFriend.id,
        name: this.state.newFriend.name,
        email: this.state.newFriend.email,
        age: this.state.newFriend.age,
      })
      .then((res) => {
        console.log(res);
      });
    this.setState({
      friends: [...this.state.friends, this.state.newFriend],
      newFriend: [],
    });
  };

  render() {
    const friendsData = this.formatData();
    console.log("friendData", friendsData);

    return (
      <div className="friends">
        <p>Central Perk</p>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              value={this.state.newFriend.name}
              onChange={(e) =>
                this.setState({
                  newFriend: {
                    ...this.state.newFriend,
                    name: e.target.value,
                  },
                })
              }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={this.state.newFriend.email}
              onChange={(e) =>
                this.setState({
                  newFriend: {
                    ...this.state.newFriend,
                    email: e.target.value,
                  },
                })
              }
            />
          </label>
          <label htmlFor="age">
            Age:
            <input
              type="text"
              name="age"
              value={this.state.newFriend.age}
              onChange={(e) =>
                this.setState({
                  newFriend: {
                    ...this.state.newFriend,
                    age: e.target.value,
                  },
                })
              }
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {friendsData.map((friend) => {
          return (
            <div key={friend.id}>
              <p>{friend.name}</p>
              <p>{friend.email}</p>
            </div>
          );
        })}
        {this.props.fetchingData && (
          <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )}
      </div>
    );
  }
}

export default FriendsList;
