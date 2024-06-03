import { Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStateProduct, updateProduct } from '../../action/ProductAction'
import { Option } from 'antd/es/mentions'

const ModalEditProduct = (props) => {
  const { isOpenModalEdit, setIsOpenModalEdit, itemProduct } = props
  const listCategory = useSelector(
    (state) => state.categoryReducer.listCategory,
  )
  const dispatch = useDispatch()
  // const loading = useSelector((state) => state.productReducer.loading)
  const { isUpdateProductSucces } = useSelector((state) => state.productReducer)

  const [dataRequest, setDataRquest] = useState({
    productId: itemProduct._id,
    title: itemProduct.title || '',
    // image: itemProduct.image || null,
    description: itemProduct.description || '',
    price: itemProduct.price || '',
    stock: itemProduct.stock || 0,
    category: itemProduct.category || '',
    categoryName: itemProduct.categoryName || '',
  })

  useEffect(() => {
    if (isUpdateProductSucces) {
      handleCancel()
      dispatch(clearStateProduct())
    }
  }, [isUpdateProductSucces])

  const handleCancel = () => {
    setIsOpenModalEdit(false)
  }

  // hàm bắt giá trị khi chọn select
  const handleChangeSelect = (option) => {
    const newDataRequest = {
      ...dataRequest,
      category: option.value,
      categoryName: option.label,
    }
    setDataRquest(newDataRequest)
  }

  // hàm bắt giá trị khi nhập input text
  const handleChange = (e) => {
    const newDataRequest = {
      ...dataRequest,
      [e.target.name]: e.target.value,
    }
    setDataRquest(newDataRequest)
  }

  // hàm call api tạo sản phẩm
  const handleCreateProduct = () => {
    dispatch(updateProduct(dataRequest))
  }

  return (
    <Modal
      open={isOpenModalEdit}
      onCancel={() => handleCancel()}
      title="Sửa sản phẩm"
      okText="Sửa"
      cancelText="Hủy"
      onOk={() => handleCreateProduct()}
    >
      <div className="d-flex flex-column gap-3 p-3">
        <Input
          name="title"
          value={dataRequest.title}
          placeholder="Nhập tên sản phẩm"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        {/* <Input type="file" onChange={(e) => handleUploadImg(e)} /> */}
        <Input.TextArea
          value={dataRequest.description}
          name="description"
          placeholder="Mô tả...."
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="price"
          value={dataRequest.price}
          placeholder="Nhập giá"
          type="number"
          onChange={(e) => handleChange(e)}
        />
        <Input
          name="stock"
          value={dataRequest.stock}
          type="number"
          placeholder="Số lượng"
          onChange={(e) => handleChange(e)}
        />
        <Select
          placeholder="Danh mục"
          value={dataRequest.category}
          labelInValue
          onChange={(value) => handleChangeSelect(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {listCategory.data && listCategory.data.map((option) => (
            <Option key={option._id} value={option.code}>
              {option.name}
            </Option>
          ))}
        </Select>
      </div>
    </Modal>
  )
}

export default ModalEditProduct
