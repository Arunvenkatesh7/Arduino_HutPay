import React, { useState } from 'react';
import axios from 'axios';
import './shop.css'
import image1 from '../Images/1.jpg';
import image2 from '../Images/3.jpg';
import image3 from '../Images/3.jpg';
import image4 from '../Images/4.jpg';
import image5 from '../Images/4.jpg';
import image6 from '../Images/6.jpg';
import image7 from '../Images/7.jpg';
import image8 from '../Images/8.jpg';


const snacksData = [
  {
      snack_image: image1,
      snack_name: "Samosa",
      price: "₹20"
  },
  {
      snack_image: image2,
      snack_name: "Pakora",
      price: "₹15"
  },
  {
      snack_image: image3,
      snack_name: "Spring Rolls",
      price: "₹25"
  },
  {
      snack_image: image4,
      snack_name: "French Fries",
      price: "₹30"
  },
  {
      snack_image: image5,
      snack_name: "Onion Rings",
      price: "₹18"
  },
  {
      snack_image: image6,
      snack_name: "Nachos",
      price: "₹22"
  },
  {
      snack_image: image7,
      snack_name: "Chicken Wings",
      price: "₹35"
  },
  {
      snack_image: image8,
      snack_name: "Mozzarella Sticks",
      price: "₹28"
  }
];
const ShopPay=()=> {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const [pricePayable,setpricePayable]=useState(0);

  const handlePurchase = async (price) => {
    try {
      await axios.post('http://localhost:5000/debit', { amount: price });
      setMessage(`Price of ${price} sent to Arduino. Please enter your card.`);
      setpricePayable(price);
    } catch (error) {
      setMessage('Error sending price to Arduino.');
    }
  };

  const snackItems = snacksData.map((snack, index) => (
    <div className="shop_box" key={index}>
      <div className="snack_image" style={{ backgroundImage: `url(${snack.snack_image})` }}></div>


      <div className="snack_name">{snack.snack_name}</div>
      <button className="snack_price" onClick={() => handlePurchase(snack.price)}>Price: {snack.price}</button>
    </div>
  ));

  return (
    <>
     <div className="shop">
        
            <div className="shop_container">
                <div className="headers">
                    <div className="header">Coffee Hut's Snacks
                    </div>
                    <div className="subheader">have fun</div>
                    {message && <div className="msg"><p>Amount Pay in Arduino:${pricePayable}</p></div>}
                </div>
         
                <div className="shop_boxes">
                    {snackItems}
                </div>
            </div>
        </div>


        
    </>
  );
}

export default ShopPay;
