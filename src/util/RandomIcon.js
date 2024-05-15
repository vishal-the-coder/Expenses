const image = [
  require('../assets/icon/icon.png'),
  require('../assets/icon/icon2.png'),
  require('../assets/icon/icon3.png'),
  require('../assets/icon/icon4.png'),
  require('../assets/icon/icon5.png'),
  require('../assets/icon/icon6.png'),
  require('../assets/icon/icon7.png'),
  require('../assets/icon/icon8.png'),
  require('../assets/icon/icon9.png'),
  require('../assets/icon/icon10.png'),
  require('../assets/icon/icon11.png'),
  require('../assets/icon/icon12.png'),
  require('../assets/icon/icon13.png'),
];

const RandomIcon = () => {
  const value = Math.random();
  const number = Math.floor(value * image.length);
  return image[number];
};

export default RandomIcon;
