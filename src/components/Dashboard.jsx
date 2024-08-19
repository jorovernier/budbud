import DashItem from './DashItem'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export default function Dashboard (){
    const {accounts, cards, expenses, income} = useLoaderData()

    function cleanUp(arr){
        let cleaned = []
        for(let item of arr){

            let toPush = {}
            for(let i = 0; i < Object.keys(item).length - 1; i++){
                toPush[Object.keys(item)[i]]=item[Object.keys(item)[i]]
            }

            let subObj = Object.values(item)[Object.values(item).length -1]
            toPush[Object.keys(subObj)[1]] = subObj[Object.keys(subObj)[1]]

            cleaned.push(toPush)
        }
        return cleaned
    }

    const [accts, setAccts] = useState(accounts)
    const [crds, setCards] = useState(cards)
    const [exps, setExps] = useState(cleanUp(expenses))
    const [inc, setIncs] = useState(cleanUp(income))

    const [show, setShow] = useState(false)
    const [subType, setSubType] = useState('')

    function resSwitch(data, title){
        switch(title) {
            case 'Income':
                setIncs(cleanUp(data))
                break;
            case 'Expenses':
                setExps(cleanUp(data))
                break;
            case 'Accounts':
                setAccts(data)
                break;
            case 'Cards':
                setCards(data)
                break;
            default:
                alert('Uh oh spaghetti-o')
        }
    }

    function handleClose(e){
        e.preventDefault()

        let formValues = {}
        
        for(let i = 0; i < e.target.elements.length - 1; i++){
            formValues[e.target.elements[i].id] = e.target.elements[i].value
        }

        let url = subType.endsWith('s') ? subType.slice(0, -1) : subType

        axios.post(`/${url.toLowerCase()}`, formValues).then(() => {
            axios.get(`/${subType.toLowerCase()}`).then((res) => {
                resSwitch(res.data, subType)
            })
        })
        
        setShow(false)
    }

    function handleShow(e){
        setSubType(e.target.id.split('-')[0])
        setShow(true)
    }

    function deleteItem(e){
        let url = e.target.id.split('-')[2].endsWith('s') ? e.target.id.split('-')[2].slice(0, -1) : e.target.id.split('-')[2]
        
        axios.delete(`/${url.toLowerCase()}/${e.target.id.split('-')[0]}`).then(() => {
            axios.get(`/${e.target.id.split('-')[2].toLowerCase()}`).then((res) => {
                resSwitch(res.data, e.target.id.split('-')[2])
            })
        })
    }

    let formGroup;

    if(subType === 'Income'){
        formGroup = <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control id='amount' type="number" step=".01" required/>

                            <Form.Label>Date</Form.Label>
                            <Form.Control id='date' type="date" required/>

                            <Form.Label>Income Type</Form.Label>
                            <Form.Select id='type' name='income-type' required>
                                <option>Paycheck</option>
                                <option>Refund</option>
                                <option>Additional</option>
                                <option>Interest</option>
                            </Form.Select>
                        </Form.Group>
    } else if(subType === 'Expenses'){
        formGroup = <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id='name' type="text" required/>

                            <Form.Label>Amount</Form.Label>
                            <Form.Control id='amount' type="number" step=".01" required/>

                            <Form.Label>Date</Form.Label>
                            <Form.Control id='date' type="date" required/>

                            <Form.Label>Expense Type</Form.Label>
                            <Form.Select id='type' name='expense-type' required>
                                <option>Grocery</option>
                                <option>Gas/EV Charging</option>
                                <option>Food/Dining</option>
                                <option>Bills</option>
                                <option>Medical</option>
                                <option>Fun</option>
                                <option>Other</option>
                            </Form.Select>

                            <Form.Label>Card Used</Form.Label>
                            <Form.Select id='card' required>
                                <option>1</option>
                                <option>2</option>
                            </Form.Select>
                        </Form.Group>
    } else if(subType === 'Accounts'){
        formGroup = <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id='name' type="text" required/>

                            <Form.Label>Bank</Form.Label>
                            <Form.Control id='bank' type="text" required/>

                            <Form.Label>Amount</Form.Label>
                            <Form.Control id='amount' type="number" step=".01" required/>
                        </Form.Group>
    } else if(subType === 'Cards'){
        formGroup = <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control id='name' type="text" required/>

                            <Form.Label>Bank</Form.Label>
                            <Form.Control id='bank' type="text" required/>

                            <Form.Label>Limit</Form.Label>
                            <Form.Control id='limit' type="number" step=".01" required/>
                        </Form.Group>
    }

    return (

        <Stack gap={4} className='p-5'>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Add '+ subType}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form id='add-form' className='d-flex flex-column' onSubmit={handleClose}>
                        {formGroup}

                        <Button className='btn-reseda mt-3' id='add-form-btn' type='submit'>
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>

            <Row className='justify-content-evenly'>
                <Col xs={6} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Income'} data={inc} setData={setIncs} show={handleShow} del={deleteItem}/>
                </Col>
                <Col xs={3} className='border border-4 border-black rounded'>
                    chart
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={6} className='rounded bg-body-secondary p-3'>   
                    <DashItem title={'Expenses'} data={exps} setData={setExps} show={handleShow} del={deleteItem}/>
                </Col>
                <Col xs={3} className='border border-4 border-black rounded'>
                    chart
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={10} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Accounts'} data={accts} setData={setAccts} show={handleShow} del={deleteItem}/> 
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={10} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Cards'} data={crds} setData={setCards} show={handleShow} del={deleteItem}/>
                </Col>
            </Row>
        </Stack>
    )
}