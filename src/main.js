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
            let arr = []
            res.products.map(a => {
                if (a.delivery_time === e) {
                    arr.push(a)
                }
                // setFilter(arr)
                setData((oldata) => ({
                    ...oldata,
                    products: arr
                }))
            }) 
        })
    }
    
    const handleChangeFurniture = e => {
        fetch(api)
        .then(res => res.json())
        .then(res => {
            let arr = []
            res.products.map(a => {
                a.furniture_style.map(b => {
                    if (b === e) {
                        arr.push(a)
                    }
                })
                console.log('arr', arr)
                // setFilter(arr)
                setData((oldata) => ({
                    ...oldata,
                    products: arr
                }))
            }) 
        })
      
        console.log('data1', filter)


    }


    const search = e => {
        const lowercasedValue = e.toLowerCase();
        const filterdata = data.products.filter(el => el.name.toLowerCase().includes(lowercasedValue))

        console.log('filerdata', filterdata)
        setData((prevState) => ({
           ...prevState,
           products: filterdata
        }))
    }

    useEffect(() => {
        setFilter(data.products)
    })



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
                <Select allowClear='true' defaultValue="Furniture Style" style={{ width: '100%' }} onChange={handleChangeFurniture}>
                    {data.furniture_styles !== undefined &&data.furniture_styles.map((list, id) => {
                        return <Option key={id} value={list}>{list}</Option>
                    })}
                </Select>
                </Col>
                <Col span={10} offset={1}>
                <Select defaultValue="Delivery Time" style={{ width: '100%' }} onChange={handleChangeTime}>
                    {data.products !== undefined && data.products.map((list, ix) => {
                        return <Option key={list.delivery_time} value={list.delivery_time}>{list.delivery_time}</Option>
                    })}
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
                        <Card title={item.name + ' --- ' + item.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} style={{minHeight: '400px'}}>{item.description}
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