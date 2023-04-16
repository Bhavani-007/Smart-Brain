import { Component } from 'react';
import './App.css';
import 'tachyons';
import Navigation from './components/navigation/Navigation';
import Register from './components/register/Register';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/face_recognition/FaceRecognition';
import ParticlesBg from 'particles-bg';

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [], // it was {}
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    };
  }

  calculateFaceLocation = (dataObject) => {
    const clarifaiFaces = dataObject.outputs[0].data.regions.map((region) => region.region_info.bounding_box)
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return clarifaiFaces.map((face) => { return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height),
    }
      
    })
  }

  displayFaceBox = (box) => {
    this.setState({box: box}) 
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onImageSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('http://localhost:3000/handleApiOutput', {
      method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            imageUrl: this.state.input,
          })
    })
    .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
    .catch(error => console.log('error', error));
  }

onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({route: 'home'});
      this.setState({isSignedIn: true})
    }else if (route === 'register') {
      this.setState({route: 'register'})
    }else if (route === 'signin') {
      this.setState({route: 'signin'})
      this.setState({isSignedIn: false})
      this.setState({box: []})
      this.setState({imageURL: ''})
    }
  } 
  
  loadUser = (userData) => {
    this.setState({
      user : {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.date,
      }
    })
    
  }

  render () {
      return (
      <div className="App">
        <div>
        <Navigation 
          onRouteChange = {this.onRouteChange} 
          isSignedIn = {this.state.isSignedIn}
        />
        <ParticlesBg color="#f2f3f4" num={150} type="cobweb" 
        bg = {true} />
        { 
          this.state.route === 'signin'?
          <SignIn onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/> : 
          (
            this.state.route === 'home'?
            <div>
            
            <Logo />
            <Rank userName = {this.state.user.name} userEntries = {this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange = {this.onInputChange} 
              onButtonSubmit = {this.onImageSubmit}
            />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
            </div> :
            <Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser}/>
          )
        } 
        </div>
      </div>
    );
  } 
}

export default App;