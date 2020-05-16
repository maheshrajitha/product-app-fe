import React, { Component } from 'react'
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Button, Modal, ModalHeader, ModalBody, Form, Label, FormGroup, Input } from 'reactstrap'
import { getCategories } from '../services/category.service';
import { convertDate } from '../util/util';
import { addNewCategory , deleteCategory } from '../services/category.service';

let categories = [
    {
        id: 1,
        category: 'Mobile Phones',
        addedDate: new Date().getTime()
    }
]
export default class Category extends Component {

    state = {
        isOpen: false,
        categories: []
    }
    constructor(props) {
        super(props);
        if (localStorage.getItem('token') === null || typeof localStorage.getItem('token') === 'undefined') {
            window.location.replace('/');
        }
    }

    addNewCategoryButtonHandler = () => {
        let newCategory = {
            category: document.getElementById('category').value
        }
        addNewCategory(newCategory).then(_=> {
            window.location.reload();
        }).catch(e => {
            console.log(e.response.data);
        })
    }

    componentDidMount() {
        getCategories().then(data => {
            this.setState({
                categories: data
            });
        }).catch(e => {
            console.log(e.response.data); 
        });
    }
    
    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    deleteButtonHandler = (categoryId) => {
        deleteCategory(categoryId).then(_ => {
            window.location.reload();
        }).catch(e => {
            console.log(e.response.data);
        });
    }
    render() {
        return (
            <div className={'content'}>
                <Container>
                    <Row>
                        <Row className={'mb-5'}>
                            <Col md={12}>
                                <Button size={'sm'} color={'primary'} onClick={this.toggle}>Add New Category</Button>
                                <Modal centered toggle={this.toggle} isOpen={this.state.isOpen}>
                                    <ModalHeader>Add New Category</ModalHeader>
                                    <ModalBody>
                                        <Form>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input type={'text'} placeholder={'Type Category Name'} size={'sm'} required id={'category'}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button onClick={this.addNewCategoryButtonHandler} size={'sm'} color={'dark'}>Add Category</Button>
                                            </FormGroup>
                                        </Form>
                                    </ModalBody>
                                </Modal>
                            </Col>
                        </Row>
                        <Col md={12} className={'align-self-center offset-md-12'}>
                            <Card>
                                <CardHeader>
                                    <h5>Categories</h5>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Added Date</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.categories.map((category, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{category.category}</td>
                                                    <td>{convertDate(category.addedDate)}</td>
                                                    <td>
                                                        <Button onClick={()=> this.deleteButtonHandler(category.id)} size={'sm'} color={'secondary'}>Delete</Button>
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
