  
import React from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { productList: [] };
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
            </div>
        )
    }


}

export default withRouter(ProductList);
