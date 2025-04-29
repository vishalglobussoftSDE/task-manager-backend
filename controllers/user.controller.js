import userModel from '../models/user.model.js'
export const getAllUsers = (req, res) => {
    try {
        const allUser = UserModel.find({});
        allUser
            .then((users) => {
                if (users.length === 0) {
                    return res.status(404).json({ message: "No users found" });
                }
                res.status(200).json({ message: "Users fetched successfully", users });
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                res.status(500).json({ message: "Internal Server Error", error: error.message });
            });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
};
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
 
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } 

        const newUser = new UserModel({ name, email, password });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userUpdate = await UserModel.findOneAndUpdate({ email }, { $set: { name, password } });
        if (!userUpdate) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user: userUpdate });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
}