
export const createUser = (req, res) => {
    try {
        const user = req.body.user
        console.log(user)
        res.status(200).json('success')
    } catch (error) {
       console.log(error)
    }
}