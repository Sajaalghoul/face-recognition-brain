import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkFotm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: "",
        joined: "",
      },
    };
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response=>response.json())
  //   .then(console.log)
  // }
  OnInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  displayBoxFace = (box) => {
    this.setState({ box: box });
  };
  CalculateFaceLocatoion = (data) => {
    const clarifieFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifieFace.left_col * width,
      topRow: clarifieFace.top_row * height,
      rightCol: width - clarifieFace.right_col * width,
      bottomRow: height - clarifieFace.bottom_row * height,
    };
  };
  returnClarifieResponse = () => {
    const PAT = "88177ab890f744efaaa09b7cd09c7b98";
    const USER_ID = "saja-alghoul";
    const APP_ID = "Face-recognition-app";
    const IMAGE_URL = this.state.input;
    ///do not change
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    return requestOptions;
  };

  onImageSubmit = () => {
    const MODEL_ID = "face-detection";
    this.setState({ imageUrl: this.state.input });
    //api
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      this.returnClarifieResponse()
    )
    .then(response=>response.json())
    .then((response) => {
      if(response)
     { fetch("http://localhost:3000/image", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: this.state.user.id,
        }),
      })
      .then(response=>response.json())
      .then((count) => {
        this.setState(Object.assign(this.state.user, { entries: count }));
        console.log(this.state.user)
      });
      this.displayBoxFace(this.CalculateFaceLocatoion(response));}
    })
      .catch((error) => console.log("error", error));
  };
 
  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signout") {
      this.setState({ isSignedIn: false });
    }
    this.setState({ route: route });
  };
  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num={200} color="#FFFFFF" bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              OnInputChange={this.OnInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition Box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
