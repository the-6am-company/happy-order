import React from 'react'

import './style.css'

let numbro = require('numbro')

const Percent = props => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', width: 150 }}>Số phần trăm:</span>
        <input
          value={props.percentDiscount}
          onChange={e => props.handleChangeInput(e)}
          name="percentDiscount"
          className="Input_Discount"
          style={{ margin: '0 5px' }}
          type="number"
        />
        <span>%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', width: 150 }}>Số tiền giảm tối đa:</span>
        <input
          value={props.moneyMaxDiscount}
          onChange={e => props.handleChangeInput(e)}
          name="moneyMaxDiscount"
          className="Input_Discount"
          style={{ margin: '0 5px' }}
          type="number"
        />
        <span> VNĐ</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', width: 150 }}>Tiền ship:</span>
        <input
          value={props.moneyShip}
          onChange={e => props.handleChangeInput(e)}
          name="moneyShip"
          className="Input_Discount"
          style={{ margin: '0 5px' }}
          type="number"
        />
        <span> VNĐ</span>
      </div>
    </div>
  )
}

const Cash = props => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', width: 150 }}>Số tiền được giảm:</span>
        <input
          value={props.moneyDiscount}
          onChange={e => props.handleChangeInput(e)}
          name="moneyDiscount"
          className="Input_Discount"
          style={{ margin: '0 5px' }}
          type="number"
        />
        <span>VNĐ</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ display: 'flex', width: 150 }}>Tiền ship:</span>
        <input
          value={props.moneyShip}
          onChange={e => props.handleChangeInput(e)}
          name="moneyShip"
          className="Input_Discount"
          style={{ margin: '0 5px' }}
          type="number"
        />
        <span>VNĐ</span>
      </div>
    </div>
  )
}

const Discount = props => {
  const formatCurrency = value => numbro(value).format({ thousandSeparated: true })

  return (
    <div className="Discount_Container">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {props.isCash && (
          <span style={{ fontSize: 22, display: 'flex', width: 400 }}>
            Tổng số tiền thanh toán : {formatCurrency(props.totalCost + props.moneyShip - props.moneyDiscount)} VNĐ
          </span>
        )}
        {props.isPercent && (
          <span style={{ fontSize: 22, display: 'flex', width: 370 }}>
            Tổng số tiền thanh toán :{' '}
            {props.totalCost * (props.percentDiscount / 100) <= props.moneyMaxDiscount
              ? props.totalCost + props.moneyShip - props.totalCost * (props.percentDiscount / 100)
              : props.totalCost + props.moneyShip - props.moneyMaxDiscount}{' '}
            VNĐ
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 370, justifyContent: 'center' }}>
          <span style={{ fontSize: 18 }}>Chọn loại mã khuyến mãi</span>
          <select className="Discount_Select" onChange={props.handleChangeOption}>
            <option selected={props.isCash} value="cash">
              Giảm theo tiền mặt
            </option>
            <option selected={props.isPercent} value="percent">
              Giảm theo %
            </option>
          </select>
        </div>
        {props.isCash && (
          <Cash handleChangeInput={props.handleChangeInput} moneyShip={props.moneyShip} moneyDiscount={props.moneyDiscount} />
        )}
        {props.isPercent && (
          <Percent
            moneyShip={props.moneyShip}
            percentDiscount={props.percentDiscount}
            moneyMaxDiscount={props.moneyMaxDiscount}
            handleChangeInput={props.handleChangeInput}
          />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <button className="Button Button_Action" onClick={() => props.handleChangeStep('isAddUser')}>
          Danh sách
        </button>
        <button className="Button Button_Action" onClick={() => props.handleChangeStep('isBill')}>
          Hóa đơn
        </button>
      </div>
    </div>
  )
}

export default Discount
