import React, { useState } from 'react'

import AddUser from './components/AddUser'
import Discount from './components/Discount'
import Bill from './components/Bill'
import './App.css'

function App() {
  const [viewType, setViewType] = useState('isAddUser')

  const [listInfo, setListInfo] = useState([])

  const [count, setCount] = useState(0)

  const [totalCost, setTotalCost] = useState('')
  const [moneyShip, setMoneyShip] = useState('')
  const [moneyMaxDiscount, setMoneyMaxDiscount] = useState('')
  const [moneyDiscount, setMoneyDiscount] = useState('')
  const [percentDiscount, setPercentDiscount] = useState('')

  const [isCash, setIsCash] = useState(true)
  const [isPercent, setIsPersent] = useState(false)

  const styles = {
    border: 'none',
    outline: 'none',
    backgroundColor: '#00c3ff',
    color: 'white',
    fontWeight: '500',
    transition: 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1) 0s',
    boxShadow: '0 20px 20px rgba(0, 0, 0, .1)'
  }

  const onHandleSetListInfo = value => {
    const newListInfo = [
      ...listInfo,
      ...[
        {
          id: count,
          ...value
        }
      ]
    ]
    setListInfo(newListInfo)
    setCount(count + 1)
    setTotalCost(+totalCost + +value.price)
  }

  const onHandleChangeStep = type => {
    setViewType(type)
  }

  const onHandleChangeInput = async e => {
    switch (e.target.name) {
      case 'moneyShip':
        setMoneyShip(parseInt(e.target.value))
        break
      case 'moneyDiscount':
        setMoneyDiscount(parseInt(e.target.value))
        break
      case 'moneyMaxDiscount':
        setMoneyMaxDiscount(parseInt(e.target.value))
        break
      case 'percentDiscount':
        setPercentDiscount(parseInt(e.target.value))
        break
      default:
        return null
    }
  }

  const onHandleChangeOption = e => {
    if (e.target.value === 'cash') {
      setIsCash(true)
      setIsPersent(false)
    } else if (e.target.value === 'percent') {
      setIsCash(false)
      setIsPersent(true)
    }
  }

  const onHandleDeleteUser = idx => {
    const user = listInfo.splice(idx, 1)
    setTotalCost(+totalCost - +user[0].price)
    setListInfo([...listInfo])
  }

  return (
    <div className="App">
      <div className="Card">
        <div
          style={{
            fontSize: 32,
            fontWeight: 300,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '-15px 0'
          }}
        >
          <img style={{ width: 120 }} src="/alley51.png" alt="/alley51.png" />
          <span>Nền tảng chia tiền order theo nhóm</span>
          <img style={{ width: 70 }} src="/6am.png" alt="/6am.png" />
        </div>
        <div style={{ display: 'flex', backgroundColor: '#f4f4f4' }}>
          <button
            className="Button_A"
            style={(viewType === 'isAddUser' && styles) || {}}
            onClick={() => onHandleChangeStep('isAddUser')}
          >
            THÊM DANH SÁCH
          </button>
          <button
            className="Button_B"
            style={(viewType === 'isDiscount' && styles) || {}}
            onClick={() => onHandleChangeStep('isDiscount')}
          >
            NHẬP MÃ GIẢM GIÁ
          </button>
          <button
            className="Button_C"
            style={(viewType === 'isBill' && styles) || {}}
            onClick={() => onHandleChangeStep('isBill')}
          >
            HÓA ĐƠN
          </button>
        </div>
        <div style={{ display: 'flex', padding: '40px 40px 20px 40px', flex: 1, overflow: 'scroll' }}>
          {viewType === 'isAddUser' && (
            <AddUser
              handleChangeStep={onHandleChangeStep}
              handleDeleteUser={onHandleDeleteUser}
              handleSetListInfo={onHandleSetListInfo}
              listInfo={listInfo}
            />
          )}
          {viewType === 'isDiscount' && (
            <Discount
              totalCost={totalCost}
              listInfo={listInfo}
              handleChangeStep={onHandleChangeStep}
              handleChangeInput={onHandleChangeInput}
              moneyShip={moneyShip}
              moneyDiscount={moneyDiscount}
              moneyMaxDiscount={moneyMaxDiscount}
              percentDiscount={percentDiscount}
              handleChangeOption={onHandleChangeOption}
              isCash={isCash}
              isPercent={isPercent}
            />
          )}
          {viewType === 'isBill' && (
            <Bill
              handleChangeStep={onHandleChangeStep}
              listInfo={listInfo}
              isCash={isCash}
              isPercent={isPercent}
              moneyShip={moneyShip}
              moneyDiscount={moneyDiscount}
              moneyMaxDiscount={moneyMaxDiscount}
              percentDiscount={percentDiscount}
              totalCost={totalCost}
            />
          )}
        </div>
      </div>
      <div style={{ display: 'flex', color: 'white' }}>
        <span>
          Make with love by{' '}
          <a
            className="frontpage_footer"
            target="_blank"
            without
            rel="noopener noreferrer"
            href="https://tuyenlaodongphothong.com"
          >
            tuyenlaodongphothong.com
          </a>
        </span>
      </div>
    </div>
  )
}

export default App
