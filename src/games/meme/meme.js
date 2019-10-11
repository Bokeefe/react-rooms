import React from 'react';
import './meme.css';

var imgs = require('./meme_img_array.json');

class Meme extends React.Component {
  constructor(props) {
    super(props);
  }

  pickRandomImg() {
    return imgs[Math.floor(Math.random() * imgs.length)];
  }

  render() {
    return (
      <div className="img-container">
        <img src={require('./cursed/' + this.pickRandomImg())} />
      </div>
    );
  }
}

export default Meme;
