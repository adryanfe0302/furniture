import React, { useState, useContext, useEffect } from 'react';
import { Select, Row,  List, Card, Col, Divider, Input} from 'antd';
import api from './api'
import { StateContext } from './stateContext'
const { Option } = Select;
const { Search } = Input;

const Main = (props) => {
    const [data, setData] = useContext(StateContext)
    const [filter, setFilter] = useState(data.products)
    const handleChangeTime = e => {
        fetch(api)
        .then(res => res.json())
        .then(res => {
            if (e.length === 0) {
                setData(res)
            } else {
                let arr = []
                res.products.map((a,i) => {
                    e.forEach(ee => {
                        if (a.delivery_time <= ee) {
                            arr.push(a)
                        }
                    })
                    setData((oldata) => ({
                        ...oldata,
                        products: arr.filter((item, idx) => arr.indexOf(item) === idx)
                    }))
                }) 
            }
        })
    }
    
    const handleChangeFurniture = e => {
        fetch(api)
        .then(res => res.json())
        .then(res => {
            if (e.length === 0) {
                setData(res)
            } else {
                let arr = []
                res.products.map(a => {
                    a.furniture_style.map(b => {
                        e.forEach(ee => {
                            if (b === ee) {
                                arr.push(a)
                            }
                        })
                        
                    })
                    setData((oldata) => ({
                        ...oldata,
                        products: arr
                    }))
                }) 
            }
        })
    }

    const search = e => {
        const lowercasedValue = e.toLowerCase();
        const filterdata = data.products.filter(el => el.name.toLowerCase().includes(lowercasedValue))
        setFilter(filterdata)
    }

    useEffect(() => {
        setFilter(data.products)
    }, [data])

    return (
        <Row>
            <Col span={24}>
            <br />
            <div className='headerstyle'>
                <Col span={10}>
                    <Search
                    placeholder="Search Furniture"
                    onSearch={search}
                    className='search'
                    />
                </Col>
                <br /><br /><br />
                <Col span={10}>
                <Select mode="multiple" placeholder="Furniture Style" style={{ width: '100%' }} onChange={handleChangeFurniture}>
                    {data.furniture_styles !== undefined &&data.furniture_styles.map((list, id) => {
                        return <Option key={id} value={list}>{list}</Option>
                    })}
                </Select>
                </Col>
                <Col span={10} offset={1}>
                <Select mode="multiple" placeholder="Delivery Time" style={{ width: '100%' }} onChange={handleChangeTime}>
                    <Option key={1} value={7}>1 Week</Option>
                    <Option key={2} value={14}>2 Weeks</Option>
                    <Option key={3} value={31}>1 Month</Option>
                    <Option key={4} value={32}>More</Option>
                </Select>
                </Col>
            </div>
            <Divider />

            {filter !== undefined &&         
                <List
                    style={{padding:'15px'}}
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={filter}
                    renderItem={(item, index) => (
                    <List.Item align='left' key={index}>
                        <Card title={item.name + ' --- IDR.' + item.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} style={{minHeight: '400px'}}>{item.description}
                        <Divider />
                        {item.furniture_style.map(a => {
                            return <div>{a}</div>
                        })}
                        <Divider />
                        <div align='right'> {item.delivery_time} </div>
                        </Card>
                    </List.Item>
                    )}
                />
            }
            </Col>
        </Row>  
    )
}

export default Main