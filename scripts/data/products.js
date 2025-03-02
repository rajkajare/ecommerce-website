/*------------------------Data-----------------------*/

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  get_rating() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  get_price() {
    return `$${(this.priceCents / 100).toFixed(2)}`;
  }
  extraInfo() {
    return "";
  }
};





class Clothing extends Product{
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfo() {
    return `
      <a href= ${this.sizeChartLink} target="_blank">
        Size chart
      </a>
    `;
  }
};





class Appliance extends Product{
  instructionLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionLink = productDetails.instructionLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfo() {
    return `
      <a href= ${this.instructionLink} target="_blank">
        Instruction
      </a>
      <a href= ${this.warrantyLink} target="_blank">
        Warranty
      </a>
    `;
  }
};





export let products = [];















/*-----------------------Functions-----------------------*/

export function load_products_fetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response)=>{
    return response.json();
  }
  ).then((productsData)=>{
    products = productsData.map((productDetails, index)=>{
      //adding some property to specify some product as appliance type..
      if (index===3 || index===15 || index===34 || index===38) {
        productDetails.type = "appliance";
        productDetails.instructionLink = "images/appliance-instructions.png";
        productDetails.warrantyLink = "images/appliance-warranty.png";
      }

      //continue..
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });
  })

  return promise;
}





export function get_product(cartProductId) {
  for (let i=0; i<products.length; i++) {
    if (products[i].id === cartProductId) {
      return (products[i]);
    }
  }
}