const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const {name, email, password, confirmPassword, phone} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !confirmPassword || !phone ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is required'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response  = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message,
            status: 'ERROR'
        })
    }
}

const loginUser = async (req, res) => {
    try {
        console.log(req.body)
        const {name, email, password, confirmPassword, phone} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if (!name || !email || !password || !confirmPassword || !phone ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The email is required'
            })
        }else if(password !== confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response  = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id 
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: 'The userId is required'
            })
        }
        const response  = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id 
        console.log('userId', userId)

        if (!userId) {
            return res.status(200).json({
                status: "ERR",
                message: 'The userId is required'
            })
        }
        const response  = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response  = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id 
        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "The userId is required"
            })
        }
        const response = await UserService.getDetailsUser(userId)

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

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1] 
        if (!token) {
            return res.status(400).json({
                status: "ERR",
                message: "The token is required"
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)

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




module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}