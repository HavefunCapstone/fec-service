import "./index.css";
import React from "react";
import axios from "axios";
import Card from "./Card.jsx";
import Carousel from "./Caroussel.jsx";
import Modal from "./Modal.jsx";

class Related extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 11050,
      currentProduct: {},
      OutFITProducts: [],
      relatedProducts: [],
      showModalCompairing: false,
      busy: true,
      comparingArray: [],
      displayProductChar: [],
    };
    this.addProductToOutFit = this.addProductToOutFit.bind(this);
    this.deleteProductFromOutFIT = this.deleteProductFromOutFIT.bind(this);
  }

  averageRating(f_ratings) {
    //console.log(f_ratings)
    if (!f_ratings) return 0;
    let array_keys = Object.keys(f_ratings);
    let array_values = Object.values(f_ratings);
    const reducer = (accumulator, currentValue) =>
      parseInt(accumulator) + parseInt(currentValue);

    let array_mulyipl = [];
    for (var i = 0; i < array_values.length; i++) {
      array_mulyipl.push(parseInt(array_values[i]) * parseInt(array_keys[i]));
    }

    let sommation_multiple_values = array_mulyipl.reduce(reducer);
    let sommation_values = array_values.reduce(reducer);

    return sommation_multiple_values / sommation_values;
  }
  componentDidMount = async () => {
    this.setState({ busy: true });
    await this.getProductById(this.state.product_id); //11050
    await this.relateItems(this.state.product_id); //11020, 11200,1455
    this.setState({ busy: false });
  };

  relateItems = async (id) => {
    const relArray = await axios.get("/api/products/" + id + "/related");

    for (var i = 0; i < relArray.data.length; i++) {
      await this.getProductById(relArray.data[i]);
    }
  };
  getProductById = async (id /**11020 */) => {
    const product_res = await axios.get(
      "/api/products/" + id
    ); /**getting product information by id */
    let product = product_res.data;

    const product_stl_res = await axios.get(
      "/api/products/" + id + "/styles"
    ); /**getting firdt photo from style by id product */
    product.img =
      product_stl_res.data.results[0].photos[0].thumbnail_url; /**adding img to the current product */

    //console.log (product_stl_res.data.results[0].sale_price)
    product.sale_price = product_stl_res.data.results[0].sale_price;

    const product_rating_res = await axios.get(
      "/api/products/reviews/meta/" + id
    ); /**getting rattings reviews  */
    product.rating = this.averageRating(
      product_rating_res.data.ratings
    ); /**calculating Average rating and addint it to the current product */
    product.characteristics = product_rating_res.data.characteristics;

    if (id /**11020 */ === this.state.product_id /*11050*/) {
      this.setState({ currentProduct: product });
    } else {
      let newRelatedProduct = this.state.relatedProducts;
      newRelatedProduct.push(product);
      //console.log (product)
      this.setState({ relatedProducts: newRelatedProduct });
    }
  };

  deleteProductFromOutFIT(f_product_id) {
    const newOutFitProduct = this.state.OutFITProducts;

    var filtered = newOutFitProduct.filter(
      (product) => product.id !== f_product_id
    );
    this.setState({ OutFITProducts: filtered });
  }

  addProductToOutFit() {
    // console.log("called from parent");

    // console.log(this.state.currentProduct);
    const newOutFitProduct = this.state.OutFITProducts;

    const indexFind = this.state.OutFITProducts.findIndex(
      (product) => product.id === this.state.currentProduct.id
    );
    // console.log(indexFind);
    if (indexFind === -1) {
      newOutFitProduct.push(this.state.currentProduct);
      this.setState({ OutFITProducts: newOutFitProduct });
    }
  }

  allProducts() {
    axios.get("/api/products").then((response) => {
      //res.send(response.data)
      // console.log(response.data)
    });
  }
  productStyles() {
    axios
      .get("/api/products/" + this.state.product_id + "/styles")
      .then((response) => {
        //res.send(response.data)
        //console.log(response.data.results)
        this.setState({ image: response.data.results });
      });
  }

  showCompairing(f_clicked_product) {
    let arraycomp = [];
    /***creating comp table data */
    // console.log(f_clicked_product.characteristics);
    //f_clicked_product.characteristics
    //this.state.currentProduct.characteristics
    Object.keys(f_clicked_product.characteristics).map((charc) => {
      // console.log(charc); //fit, duatte, chyz,
      arraycomp.push({ currPrd: false, charc: charc, clickedPrd: true });
    });

    Object.keys(this.state.currentProduct.characteristics).map((charc) => {
      // console.log(charc); //fit, duatte, chyz,
      //let indexFind =arraycomp.indexOf({'currPrd':false, 'charc':charc, 'clickedPrd':true})
      const indexFind = arraycomp.findIndex(
        (compObj) =>
          compObj.currPrd === false &&
          compObj.charc === charc &&
          compObj.clickedPrd === true
      );
      // console.log(indexFind);
      if (indexFind === -1) {
        arraycomp.push({ currPrd: true, charc: charc, clickedPrd: false });
      } else arraycomp[indexFind].currPrd = true;
    });

    /***show modal comp */
    this.setState({ showModalCompairing: true, comparingArray: arraycomp });
  }

  render() {
    return (
      // <div style={{ overflowX: 'auto', display:'flex'}} >
      <div>
        {this.state.showModalCompairing && (
          <>
            {" "}
            <div
              onClick={() => this.setState({ showModalCompairing: false })}
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">COMPAIRING</h3>
                  </div>
                  {/*body*/}
                  <div>
                    <div>
                      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
                        <tbody>
                          <tr className="text-left border-b-2 border-gray-300">
                            <th className="px-4 py-3">Current Product</th>
                            <th className="px-4 py-3"></th>
                            <th className="px-4 py-3">Clicked Product</th>
                          </tr>

                          {this.state.comparingArray.map((compLine, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  {compLine.currPrd && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </td>

                                <td style={{ textAlign: "center" }}>
                                  {compLine.charc}
                                </td>

                                <td
                                  style={{ right: "10%", position: "absolute" }}
                                >
                                  {compLine.clickedPrd && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6  "
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
                </div>
              </div>
            </div>
          </>
        )}
        {this.state.busy == true ? (
          <div>Loading .....</div>
        ) : (
          <div>
            <h2 className="p-8 text-xl font-bold"> RELATED PRODUCTS</h2>
            <Carousel>
              {this.state.relatedProducts.map((prd) => {
                return (
                  <div
                    className="flex flex-wrap w-full m-0 justify-evenly "
                    key={prd.id}
                    onClick={() => this.showCompairing(prd)}
                  >
                    <Card haveClose={false} product={prd} />
                  </div>
                );
              })}
            </Carousel>

            <div className="p-8 text-xl font-bold"> OUT FIT</div>

            <Carousel>
              <div key={-1}>
                <Card
                  className="flex flex-wrap w-full justify-evenly m-0"
                  addProductToOutFit={this.addProductToOutFit}
                  isButton={true}
                />
              </div>
              {this.state.OutFITProducts.map((prd, index) => {
                return (
                  <div key={index}>
                    <Card
                      deleteProductFromOutFIT={this.deleteProductFromOutFIT}
                      haveClose={true}
                      product={prd}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
    );
  }
}
export default Related;
