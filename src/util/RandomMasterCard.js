const image = [
    require('../assets/images/Atm.jpg'),
    require('../assets/images/Atm1.jpg'),
    require('../assets/images/Atm2.jpg'),
    require('../assets/images/Atm3.jpg'),
    require('../assets/images/Atm4.jpg'),
    require('../assets/images/Atm5.jpg'),
  ];
  
  const RandomMasterCard = () => {
    const value = Math.random();
    const number = Math.floor(value * image.length);
    return image[number];
  };
  
  export default RandomMasterCard;