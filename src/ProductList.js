  
import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';
import { Dropdown } from 'semantic-ui-react'

const imageOptions = [
    {
      key: '1',
      text: '',
      value: 'https://i.ibb.co/6n8BhQw/001-apple.png',
      image: { avatar: true, src: 'https://i.ibb.co/6n8BhQw/001-apple.png'},
    },
    {
      key: '2',
      text: '',
      value: 'https://i.ibb.co/nCC6cGG/010-broccoli.png',
      image: { avatar: true, src: 'https://i.ibb.co/nCC6cGG/010-broccoli.png' },
    },
  ]

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { productList: [] , show: true, pictureOfProduct: '', 
        nameOfProduct: 'Nazwa produktu', 
        amountOfProduct: 0, 
        minValueOfProduct: 0,};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }


    componentDidMount() {
        this.fetchProductList('https://zapasnik.herokuapp.com/products')
    }

    fetchProductList = (url) => {
        fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
            this.setState({productList: jsonResponse})
            console.log(jsonResponse);
        }
        
        )
    }

    showForms = () => {
        this.setState({
            show:!this.state.show
        })
    }


    addProduct = () => {
        alert('Dodano produkt');
        //Here we will be implementing adding a product
    }

    renderHead = () => {
        return <tr>
            <td><p></p></td>
            <td><p>Nazwa</p></td>
            <td><p>Liczba</p></td>
            <td><p>Min. wartość</p></td>
        </tr>
    }

    renderList = (productList) => {

        return (productList && productList.map((product) => {
            const {id, productName, amount, minAccValue, pictureNumber} = product;
            return <tr key={id}>
                <td><img src={pictureNumber} alt="Symbol" className="imageOfProduct"/></td>
                <td><p>{productName}</p></td>
                <td><p>{amount}</p></td>
                <td><p>{minAccValue}</p></td>
            </tr>
        }))
    }



    render() {
        return(
            <div>
                <table>
                   <thead>{this.renderHead()}</thead>
                   <tbody>{this.renderList(this.state.productList)}</tbody>
                </table>
                {
                       this.state.show? <div><button onClick={this.showForms}>Dodaj produkt</button></div> : <div>
                            <table>
                                <td>
                                <Dropdown
                                inline
                                options={imageOptions}
                                defaultValue={imageOptions[0].value}
                                />
                                </td>
                                <td>
                                    <form>
                                    <label>
                                        <input name="nameOfProduct" value={this.state.nameOfProduct} onChange={this.handleInputChange} />
                                    </label>
                                    </form>
                                </td>
                                <td>
                                    <form>
                                    <label>
                                        Liczba
                                        <input name="amountOfProduct" value={this.state.amountOfProduct} onChange={this.handleInputChange}>
                                        </input>
                                    </label>
                                    </form>
                                    </td>
                                <td>
                                    <form>
                                    <label>
                                        Min. wartość
                                        <input name="minValueOfProduct" value={this.state.minValueOfProduct} onChange={this.handleInputChange}>
                                        </input>
                                    </label>
                                    </form>
                                </td>
                            </table>
                            <button onClick={this.showForms}>Anuluj</button>
                            <button onClick={this.addProduct}>Dodaj produkt</button>
                           </div> 
                   } 
            </div>
        )
    }


}

export default withRouter(ProductList);
