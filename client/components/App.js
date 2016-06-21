import React from 'react'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      stories: []
    }
  }

  componentDidMount () {
    fetch('/api/stories')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({ stories: res })
    })
    .catch(e => console.log(e))
  }

  render () {
    return (
      <div>
        {this.state.stories.length > 0 && this.state.stories.map((story, i) => <div>{story.title}</div>)}
      </div>
    )
  }
}

export default App
