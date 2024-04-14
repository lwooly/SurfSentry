import { addUserToDB } from "./queries.js"
// export const getUser = (req, res) => {
//     try {
//         //check if user id is provided
//         const {id} = req.params



//         // if id provided return user
//         if(id) {
//             const user = getUserFromDB()
//         }
//     }
// }

export const createUser = async (req, res) => {
    try {
        const user = req.body
        await addUserToDB(user)
        console.log('user added to db')
        res.status(200).json('Success: User added to database')

    } catch (error) {
       console.log(error)
       res.status(500).json('Internal server error')
    }
}