import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Text
} from "react-native";
import api from "./../services/api";
import camera from "./../assets/camera.png";
import more from "./../assets/more.png";
import like from "./../assets/like.png";
import comment from "./../assets/comment.png";
import send from "./../assets/send.png";
import io from "socket.io-client";

class Feed extends React.Component {
  state = {
    feed: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.navigate("New")}
        >
          <Image source={camera} />
        </TouchableOpacity>
      )
    };
  };
  handleLike = id => {
    api.api.post(`/posts/${id}/liker`);
  };

  registerToSocket = () => {
    const socket = io(api.baseURL);
    socket.on("post", newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      });
    });
    socket.on("liker", like => {
      this.setState({
        feed: this.state.feed.map(post => (post._id === like._id ? like : post))
      });
    });
  };

  componentDidMount = async () => {
    this.registerToSocket();

    try {
      const response = await api.api.get("posts");
      console.log(response);
      this.setState({
        feed: response.data
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={this.state.feed}
          keyExtractor={item => item._id}
          renderToHardwareTextureAndroid
          renderItem={({ item, index }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>
              <Image
                source={{ uri: `http://192.168.1.2:3333/files/${item.image}` }}
                style={styles.feedImage}
              />
              <View style={styles.feedImageFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Image source={like} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}} style={styles.action}>
                    <Image source={comment} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}} style={styles.action}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    backgroundColor: "#ccc",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: 14,
    color: "#000"
  },
  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },
  feedImage: {
    width: "100%",
    height: 400,
    marginBottom: 15
  },
  feedImageFooter: {
    paddingHorizontal: 15
  },
  actions: {
    flexDirection: "row"
  },
  action: {
    marginRight: 8
  },
  likes: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },
  description: {
    lineHeight: 18,
    color: "#000"
  },
  hashtags: {
    color: "#7159c1"
  }
});

export default Feed;
