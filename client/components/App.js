import React from 'react'
import CommentForm from './CommentForm'
import Button from './Button'
import Helmet from 'react-helmet'

class App extends React.Component {
  render () {
    return (
      <div>
        <Helmet
          htmlAttributes={{ 'lang': 'en', 'amp': undefined }} // amp takes no value
          title='React Restart'
          base={{'target': '_blank', 'href': '0.0.0.0:5000'}}
          meta={[
              {'name': 'description', 'content': 'Helmet application'},
              {'property': 'og:type', 'content': 'article'}
          ]}
          link={[
              {'rel': 'canonical', 'href': 'http://mysite.com/example'},
              {'rel': 'apple-touch-icon', 'href': 'http://mysite.com/img/apple-touch-icon-57x57.png'},
              {'rel': 'apple-touch-icon', 'sizes': '72x72', 'href': 'http://mysite.com/img/apple-touch-icon-72x72.png'}
          ]}
          script={[
            {'type': 'application/ld+json', innerHTML: '{ "@context": "http://schema.org" }'}
          ]}
          onChangeClientState={(newState) => console.log(newState)}
      />
        <Button />
        <CommentForm />
      </div>
    )
  }
}

export default App
