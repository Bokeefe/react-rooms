import React from 'react';
var imgs = require('./meme_img_array.json');

class Meme extends React.Component {
  constructor(props) {
    super(props);
    console.log(imgs);
  }

  pickRandomImg() {
    return imgs[0];
  }

  render() {
    return (
      <div>
        <img src={require(this.pickRandomImg())} />
      </div>
    );
  }
}

export default Meme;
