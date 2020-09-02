import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    users: [],
    followers: []
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/JoelVega97')
    .then(res => {
      this.setState({
        users: [res.data]
      })
    })
    .catch(err => console.log('Uh Oh'))
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users){
        axios.get(this.state.users[0].followers_url)
        .then(res => {
          this.setState({
            followers: res.data,
            
          })
        })
        .catch(err => console.log('OOPS'))
      }
    }
  render() {
    return (
      <div className="App">
            <h1>GitHub User Cards</h1>

            <div className = 'MainUserCard'>
              {this.state.users.map(user => (
                <div key = {user.id}>
                  <img  height = '150px' width = '150px' src = {user.avatar_url} alt = {user.avatar_url}></img>
                  <h2>Username: {user.login}</h2>
                  <p>Followers: {user.followers} </p>
                </div>
              ))}
            </div>
            <div className = 'FollowerCards'>
              <h2>Followers</h2>
                {this.state.followers.map((fol) => (
                  <div key = {fol.id}>
                    <img height = '150px' width = '150px' src = {fol.avatar_url} alt = {fol.avatar_url}></img>
                    <h3>Username: {fol.login} </h3>
                  </div>
                ))}

            
        </div>
      </div>
     );
  }
}

export default App;
