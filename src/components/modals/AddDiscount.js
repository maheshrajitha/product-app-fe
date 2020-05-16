import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import { addDiscount } from '../../services/product.service';
export default function AddDiscount({ id, name }) {
    
    const [open, isOpen] = React.useState(false);

    const toggle = () => {
        isOpen(!open)
    }

    const addDiscountHandler = () => {
        let discount = {
            discount: document.getElementById('discount').value,
            id: id
        }
        addDiscount(discount).then(_ => {
            window.location.reload();
        }).catch(e => {
            console.log(e.response.data.message);
        })
    }
    return (
        <>
            <Button onClick={toggle} color={'primary'} size={'sm'}>Add Discount</Button>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader>{name}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label>Discount</Label>
                            <Input type={'text'} id={'discount'} bsSize={'sm'} placeholder={'Type Discount'}/>
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={addDiscountHandler} color={'dark'} size={'sm'}>Add Discount</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}
