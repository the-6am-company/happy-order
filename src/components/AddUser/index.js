import React, { useState } from 'react'

import './style.css'

const initialState = {
  id: '',
  name: '',
  item: '',
  price: ''
}

function AddUser(props) {
  const [formData, setFormData] = useState({ ...initialState })
  const [isValidate, setValidate] = useState(false)

  const updateFormData = event => {
    setValidate(false)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async e => {
    setValidate(true)
    if (!name && name.length === 0) return
    if (!price && price.length === 0) return

    const listInfo = {
      name: name,
      item: item,
      price: price,
      discount: price
    }

    props.handleSetListInfo(listInfo)
    setValidate(false)
    setFormData({
      ...initialState
    })
  }

  const handleDeleteUser = id => {
    props.handleDeleteUser(id)
  }

  const { name, item, price } = formData

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}
      className="AddUser_Container"
    >
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Tên</span>
          <input value={name} name="name" onChange={e => updateFormData(e)} className="Input" type="text" />
          {isValidate && name.length === 0 && <small className="contactBody__Input__Small">* Tên không được để trống</small>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Số tiền(đơn vị: đồng)</span>
          <input value={price} name="price" min={0} onChange={e => updateFormData(e)} className="Input" type="number" />
          {isValidate && price.length === 0 && (
            <small className="contactBody__Input__Small">* Số tiền không được để trống</small>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Sản phẩm(không bắt buộc)</span>
          <input value={item} name="item" onChange={e => updateFormData(e)} className="Input" type="text" />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: 70 }}>
          <button onClick={handleSubmit} className="Button Button_Action">
            Thêm vào danh sách
          </button>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          overflow: 'scroll'
        }}
      >
        {props.listInfo.length > 0 &&
          props.listInfo.map((i, idx) => (
            <div
              key={i.id}
              style={{
                margin: '5px',
                display: 'flex',
                flex: 0.5,
                alignItems: 'center',
                padding: 10,
                border: '1px solid #80808073',
                borderRadius: 4
              }}
            >
              <span style={{ width: 100, marginRight: 10 }}>{i.name}</span>
              <span style={{ width: 170 }}>{i.item}</span>
              <span style={{ width: 50, marginLeft: 10, marginRight: 20 }}>{i.price}</span>
              <button onClick={() => handleDeleteUser(idx)} className="array_Button">
                Xóa
              </button>
            </div>
          ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
        <button className="Button Button_Action" onClick={() => props.handleChangeStep('isDiscount')}>
          Nhập mã
        </button>
      </div>
    </div>
  )
}

export default AddUser
