const Product = require('../models/ProductModel')

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const {name, image, type, countInStock, price, rating, description } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'OK',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({ 
                name, image, type, countInStock, price, rating, description
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (Product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            console.log('updatedProduct', updatedProduct)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'DELETED PRODUCT SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({ _id: id })
            if (!product) {
                return resolve({
                    status: 'ERR',
                    message: 'Product not found'
                })
            }
            
            resolve({
                status: 'OK',
                message: 'Success',
                data: product
            })
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Something went wrong',
                error: e.message
            })
        }
    })
}

const getAllProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {    
            const allProduct = await Product.find() 
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProduct 
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}
