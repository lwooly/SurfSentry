
export const createUser = (req, res) => {
    try {
        const user = req.body.user
        console.log(user)
        res.status(200).json('Success: User added to database')
    } catch (error) {
       console.log(error)
    }
}