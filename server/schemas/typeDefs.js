const {gql} =  require ('apollo-server-express')

const typedefs = gql`
type User{
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
}
type Book {
    bookId: ID
    author: String
    description: String
    image: String
    title: String
}
type Auth {
    token: ID
    user: User
}
input SearchedBook{
    bookId: ID
    author: String
    description: String
    image: String
    title: String
}
type Mutation {
    login (email:String, password: String): Auth
    addUser (username: String, email: String, password: string): Auth
    saveBook (data: SearchedBook): User
    removeBook (bookId: ID): User
}

`
module.exports = typedefs;
