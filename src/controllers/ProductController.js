const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        const {name, image, type, countInStock, price, rating, description } = req.body
        if (!name || !image || !type || !countInStock || !price || !rating ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response  = await ProductService.createProduct(req.body)
        return res.status(200).json(response) 
    } catch (e) {
        return res.status(404).json({
            message: e.message,
            status: 'ERROR'
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id 
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: 'The productId is required'
            })
        }
        const response  = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id 
        if (!productId) {
            return res.status(400).json({
                status: "ERR",
                message: "The productId is required"
            })
        }
        const response = await ProductService.getDetailsProduct(productId)

        // Kiểm tra nếu không tìm thấy user
        if (response.status === 'ERR') {
            return res.status(404).json(response)
        }

        // Trả về thông tin user nếu tìm thấy
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal Server Error",
            error: e.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id 
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: 'The productId is required'
            })
        }
        const response  = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
} 

const getAllProduct = async (req, res) => {
    try {
        const response  = await ProductService.getAllProduct()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}