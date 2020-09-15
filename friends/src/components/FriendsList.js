import React from "react";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendsList extends React.Component {
  state = {
    friends: [],
  };

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

  render() {
    const friendsData = this.formatData();
    console.log("friendData", friendsData);

    return (
      <div className="friends">
        <p>Central Perk</p>
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
