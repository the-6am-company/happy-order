import React, { useEffect, useState } from 'react'

import './style.css'

let numbro = require('numbro')

const Bill = props => {
  const [listBill, setListBill] = useState([])

  useEffect(() => {
    if (props.isCash) {
      const newList = props.listInfo.map(i => {
        return { ...i, discount: +i.discount - (+props.moneyDiscount - +props.moneyShip) / props.listInfo.length }
      })
      setListBill(newList)
    }
    if (props.isPercent && +props.totalCost * +(props.percentDiscount / 100) <= props.moneyMaxDiscount) {
      const newList = props.listInfo.map(i => {
        return {
          ...i,
          discount: +i.discount - (+props.totalCost * +(props.percentDiscount / 100) - +props.moneyShip) / props.listInfo.length
        }
      })
      setListBill(newList)
    }
    if (props.isPercent && +props.totalCost * +(props.percentDiscount / 100) > props.moneyMaxDiscount) {
      const newList = props.listInfo.map(i => {
        return { ...i, discount: +i.discount - (props.moneyMaxDiscount - +props.moneyShip) / props.listInfo.length }
      })
      setListBill(newList)
    }
  }, [
    props.isCash,
    props.isPercent,
    props.listInfo,
    props.moneyDiscount,
    props.moneyMaxDiscount,
    props.moneyShip,
    props.percentDiscount,
    props.totalCost
  ])

  const formatCurrency = value => numbro(value).format({ thousandSeparated: true })

  return (
    <div className="Bill_Container">
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'scroll' }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
          Hóa đơn sau khi đã được giảm giá
        </span>
        <div style={{ display: 'flex', marginTop: 24, flexDirection: 'column', overflow: 'scroll' }}>
          <div style={{ display: 'flex', flex: '1' }}>
            <span style={{ display: 'flex', flex: 1 / 4, fontSize: 18 }}>Tên</span>
            <span style={{ display: 'flex', flex: 1 / 4, fontSize: 18 }}>Giá gốc</span>
            <span style={{ display: 'flex', flex: 1 / 4, fontSize: 18 }}>Giá sau khi giảm</span>
            <span style={{ display: 'flex', flex: 1 / 4, fontSize: 18 }}>Sản phẩm</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'scroll', margin: '20px 0' }}>
            {listBill &&
              listBill.map(i => (
                <div
                  key={i.id}
                  style={{
                    display: 'flex',
                    flex: '1',
                    padding: '15px 5px',
                    backgroundColor: `${i.id % 2 === 0 ? '#f4f4f4' : ''}`
                  }}
                >
                  <span style={{ display: 'flex', flex: 1 / 4 }}>{i.name}</span>
                  <span style={{ display: 'flex', flex: 1 / 4 }}>{i.price && formatCurrency(+i.price)} VNĐ</span>
                  <span style={{ display: 'flex', flex: 1 / 4 }}>
                    {i.discount && formatCurrency(Number(+i.discount).toFixed())} VNĐ
                  </span>
                  <span style={{ display: 'flex', flex: 1 / 4 }}>{i.item}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => props.handleChangeStep('isDiscount')} className="Button Button_Action">
          Nhập mã
        </button>
      </div>
    </div>
  )
}

export default Bill
