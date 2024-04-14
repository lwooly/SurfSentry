
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

export const createUser = (req, res) => {
    try {
        const user = req.body.user
        console.log(user)
        res.status(200).json('Success: User added to database')
    } catch (error) {
       console.log(error)
    }
}