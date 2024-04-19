import { addUserToDB } from "./queries.js";
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
    const data = req.body;
    await addUserToDB(data.user);
    console.log("user added to db");
    res.status(200).json("Success: User added to database");
  } catch (error) {
    console.log("User could not be added to db: error code", error.code, error.detail);
    if (error.code === "23505") {
      res.status(409).json({ error: "User already exists. Please login or use a different email." });
    } else {
      res.status(500).json({ error: "Internal server error. Please try again later." });
    }
  }
};
