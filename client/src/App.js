import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Spinner from './components/Spinner/Spinner'
import { MDBBtn, MDBCard, MDBCardImage, MDBCol } from "mdbreact";
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  async function fetchProduct() {
    const product = await fetch("api/data/product", { method: 'GET' })
    product
      .json()
      .then(res => setData(res.data))
  };

  async function buyProduct() {
    await fetch("api/data/checkout", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data.data[0]),
     })
  }

  useEffect(() => {
    fetchProduct()
  }, []);

  return (
    <div>
      {data.data ?
        <div className="container">
          <MDBCol style={{ maxWidth: "75rem" }}>
            <div className="top-row">
              <MDBCol style={{ maxWidth: "22rem" }}>
                <MDBCard>
                  <MDBCardImage 
                    className="img-fluid" 
                    id="image" 
                    src={data.data[0].primary_image.url_standard} 
                    waves 
                  />
                </MDBCard>
              </MDBCol>
              <div className="details">
                <h4><b>{data.data[0].name}</b></h4>
                <div>Specialized</div>
                <br/>
                <h5><b>${data.data[0].price}</b></h5>
                <MDBBtn 
                  gradient="aqua" 
                  id="button" 
                  style={{ width: "8rem" }}
                  onClick={buyProduct}
                  href="https://trailtoad.mybigcommerce.com/cart.php?action=buy&sku=SKU-112&source=buy_button"
                >
                  Buy Now
                </MDBBtn>
              </div>
            </div>  
            <div className="description">
              <h5><b>Description:</b></h5>
              {ReactHtmlParser(data.data[0].description)}
            </div>
          </MDBCol>
        </div>
        : <div className="spinner">
            <Spinner/>
          </div>
        }
    </div>
    
  );
}

export default App;
