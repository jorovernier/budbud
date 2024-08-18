import DashItem from './DashItem'
import { Col, Row, Stack } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import { useState } from 'react'

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

    return (
        <Stack gap={4} className='p-5'>
            <Row className='justify-content-evenly'>
                <Col xs={6} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Income'} data={inc} setData={setIncs}/>
                </Col>
                <Col xs={3} className='border border-4 border-black rounded'>
                    chart
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={6} className='rounded bg-body-secondary p-3'>   
                    <DashItem title={'Expenses'} data={exps} setData={setExps}/>
                </Col>
                <Col xs={3} className='border border-4 border-black rounded'>
                    chart
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={10} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Accounts'} data={accts} setData={setAccts}/> 
                </Col>
            </Row>

            <Row className='justify-content-evenly'>
                <Col xs={10} className='rounded bg-body-secondary p-3'>
                    <DashItem title={'Cards'} data={crds} setData={setCards}/>
                </Col>
            </Row>
        </Stack>
    )
}