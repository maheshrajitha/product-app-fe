import React, { Component } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { getCategories } from '../services/category.service';
import { getProducts, addNewProduct } from '../services/product.service';
import AddDiscount from '../components/modals/AddDiscount';


let products = [
    {
        id: 1,
        name: 'Nokia 1280',
        price: 2000.0,
        discount: 200.0,
        netPrice: 1800.0,
        categoryName: 'Mobile Phones'
    }
]
export default class Products extends Component {

    state = {
        isOpen: false,
        categories: [],
        products: []
    }
    componentDidMount() {
        getProducts().then(response => {
            this.setState({
                products: response
            });
        }).catch(e => {
            console.log(e);
        });
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        getCategories().then(reponse => {
            this.setState({
                categories: reponse
            });
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    addNewProductButtonHandler = () => {
        let selectBox = document.getElementById('category');
        let newProduct = {
            categoryId: selectBox.options[selectBox.selectedIndex].value,
            categoryName: selectBox.options[selectBox.selectedIndex].text,
            price: document.getElementById('price').value,
            name: document.getElementById('name').value,
            netPrice: document.getElementById('price').value,
            discount: '0.0'
        }
        addNewProduct(newProduct).then(_ => {
            window.location.reload();
        }).catch(e => {
            console.log(e.response.data.message);
        })
    }
    
    render() {
        return (
            <div className={'content'}>
                <Container>
                    <Row>
                        <Row className={'mb-4'}>
                            <Col md={12}>
                                <Button color={'primary'} onClick={this.toggle}>Add Product</Button>
                                <Modal centered toggle={this.toggle} isOpen={this.state.isOpen}>
                                    <ModalHeader>Add Product</ModalHeader>
                                    <ModalBody>
                                        <Form>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input type={'text'} id={'name'} placeholder={'Type Name'} bsSize={'sm'} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Price</Label>
                                                <Input type={'text'} id={'price'} placeholder={'Type Price'} bsSize={'sm'} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label>Category</Label>
                                                <Input type={'select'} id={'category'} size={'sm'}>
                                                    {this.state.categories.map((category , index)=><option key={index} value={category.id}>{category.category}</option>)}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button onClick={this.addNewProductButtonHandler} size={'sm'} color={'dark'}>Add Product</Button>
                                            </FormGroup>
                                        </Form>
                                    </ModalBody>
                                </Modal>
                            </Col>
                        </Row>
                        <Col md={12}>
                            <Card className={'shadow'}>
                                <CardHeader>Products</CardHeader>
                                <CardBody>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Discount</th>
                                                <th>Net Price</th>
                                                <th>Category Name</th>
                                                <th>Add Discount</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.products.map((product, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        {index +1}
                                                    </td>
                                                    <td>
                                                        {product.name}
                                                    </td>
                                                    <td>
                                                        {product.price}
                                                    </td>
                                                    <td>
                                                        {product.discount}
                                                    </td>
                                                    <td>
                                                        {product.netPrice}
                                                    </td>
                                                    <td>
                                                        {product.categoryName}
                                                    </td>
                                                    <td>
                                                        <h1><AddDiscount id={product.id} name={product.name}/></h1>
                                                    </td>
                                                    <td>
                                                        <Button color={'danger'} size={'sm'}>Remove</Button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
