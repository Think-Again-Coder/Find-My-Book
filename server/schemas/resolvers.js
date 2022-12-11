
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User')

const {signToken} = require('../utils/auth');
const resolvers = {
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return {
                user, token
            }
        },
        login: async(parent, {
            email, password
        }) => {
            const user = await User.findOne({
                email
            })
            if (!user) {
                throw new AuthenticationError('incorrect email')
            }
            const correctPassword = await user.isCorrectPassword(password)
            if(!correctPassword) {
                throw new AuthenticationError('Incorrect Password')
            }
            const token = signToken(user)
            return {
                user, token
            }
        }
    }
}

module.export = resolvers;