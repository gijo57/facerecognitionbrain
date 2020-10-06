import React, { Component } from 'react';
import Particles from 'react-particles-js'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import InputForm from './components/InputForm/InputForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'

const particleParams = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 600
        }
      }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.user_id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.date     
    }})
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  handleInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  handleSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch('https://calm-beyond-29318.herokuapp.com/imageurl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })            
          })
          .then(response => response.json())  
          .then(response => {
            if (response) {
              fetch('https://calm-beyond-29318.herokuapp.com/image', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
                })            
              })
              .then(response => response.json())
              .then(count => this.setState({user: {
                ...this.state.user,
                entries: count
              }}))
              .catch(err => console.log(err))
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
        })
        .catch(err => console.log(err))
  }

  handleRouteChange = (route) => {
    if (route === "SignIn") {
      this.setState(initialState)
    } else if (route === 'Home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route})
  }

  render () {
    const { isSignedIn, box, imageUrl, route, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                   params={particleParams}
        />
        <NavBar isSignedIn={isSignedIn} handleRouteChange={this.handleRouteChange}/>
        { route === "Home"
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <InputForm handleInputChange={this.handleInputChange}
                       handleSubmit={this.handleSubmit}
                       />
            <FaceRecognition box={box}
                             imageUrl={imageUrl}                            
                             />
          </div>       
        : (
            route === "SignIn"
            ? <SignIn handleRouteChange={this.handleRouteChange} loadUser={this.loadUser} />
            : <Register handleRouteChange={this.handleRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    )
  }
}

export default App;
