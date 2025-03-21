const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const genneralAccessToken = async (payload) => {
    const access_Token = jwt.sign({
        payload
    }, process.env.ACCESS_TOKEN , {expiresIn: '1h'})

    return access_Token
}

const genneralRefreshToken = async (payload) => {
    const refresh_Token = jwt.sign({
        payload
    }, process.env.REFRESH_TOKEN, {expiresIn: '365d'})

    return refresh_Token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('token', token)
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log('err', err)
                    return resolve({
                        status: 'ERROR',
                        message: 'The authentication failed'
                    })
                }
                
                const { payload } = user
                try {
                    const access_token = await genneralAccessToken({
                        id: payload?.id,
                        isAdmin: payload?.isAdmin
                    })
                    
                    console.log('access_token', access_token)
                    resolve({
                        status: 'OK',
                        message: 'Success',
                        access_token
                    })
                } catch (e) {
                    reject({
                        status: 'ERR',
                        message: 'Failed to generate access token',
                        error: e.message
                    })
                }
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



module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}