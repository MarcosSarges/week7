import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ImagePicker from "react-native-image-picker";
import api from "../services/api";
// import { Container } from './styles';

export default class New extends Component {
  state = {
    preview: null,
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Selecionar imagem",
        takePhotoButtonTitle: "Abrir câmera",
        chooseFromLibraryButtonTitle: "Abrir galeria"
      },
      upload => {
        if (upload.error) {
          console.log("Erro");
        } else if (upload.didCancel) {
          console.log("Cancelou");
        } else {
          const preview = {
            uri: `data:${upload.type};base64,${upload.data}`
          };

          let prefix = "";
          let ext = "";

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split(".");
            ext = ext.toLocaleLowerCase() === "heic" ? "jpg" : ext;
          } else {
            prefix = new Date().getTime();
            ext = "jpg";
          }
          
          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`
          };

          this.setState({
            preview,
            image
          });
        }
      }
    );
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);
    console.log(data)
    await api.api.post("posts", data);
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}
        >
          <Text style={styles.selectButtonText}>Selecionar imagem</Text>
        </TouchableOpacity>
        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          placeholder="Nome do autor"
          value={this.state.author}
          onChangeText={author => this.setState({ author })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Local da foto"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({ place })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#999"
          autoCorrect={false}
          placeholder="Descrição"
          value={this.state.description}
          onChangeText={description => this.setState({ description })}
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#999"
          placeholder="Hashtags"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({ hashtags })}
        />
        <TouchableOpacity
          style={styles.shareButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

New.navigationOptions = {
  headerTitle: "Nova publicação"
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 30 },
  selectButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    borderStyle: "dashed",
    height: 42,
    justifyContent: "center"
  },
  selectButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666"
  },
  preview: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 4
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginTop: 10,
    fontSize: 16
  },
  shareButton: {
    backgroundColor: "#7159c1",
    borderRadius: 4,
    height: 42,
    marginTop: 15,
    justifyContent: "center"
  },
  shareButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#FFF"
  }
});
