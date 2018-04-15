import React, { Component } from 'react';
import { Container } from 'reactstrap'

class DataDisplay extends Component {
  render(props){
    var characters = []
    for (var char in this.props.charactersData){
      console.log(char)
      characters.push((
        <div>
          <h3>{char}</h3>
          <p>Gifts given {this.props.charactersData[char]}</p>
        </div>
      ))
    }
    console.log(characters)
    return (
      <Container>
        <h2>Characters</h2>
        {characters}
      </Container >
    );
  }

}


export default DataDisplay;
