const express = require('express');
const router = express.Router();
const products = require('../Models/Products');
const users = require('../Models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authSecret = process.env.JWT_SECRET || 'ims-development-secret';

const createToken = (user) => jwt.sign({ id: user._id, email: user.email }, authSecret, { expiresIn: '7d' });

router.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 6) {
        return res.status(400).json({ message: 'Name, email, and a password of at least 6 characters are required.' });
    }

    try {
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        if (existingUser) return res.status(409).json({ message: 'An account with this email already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await users.create({ name, email: email.toLowerCase(), password: hashedPassword });
        res.status(201).json({ token: createToken(user), user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Unable to create account.' });
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email: email?.toLowerCase() });
        const validPassword = user && await bcrypt.compare(password || '', user.password);
        if (!validPassword) return res.status(401).json({ message: 'Invalid email or password.' });

        res.json({ token: createToken(user), user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Unable to log in.' });
    }
});

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductStock, ProductSold } = req.body;

    try {
        const pre = await products.findOne({ ProductBarcode: ProductBarcode })
        console.log(pre);

        if (pre) {
            res.status(422).json("Product is already added.")
        }
        else {
            const addProduct = new products({ ProductName, ProductPrice, ProductBarcode, ProductStock, ProductSold })

            await addProduct.save();
            res.status(201).json(addProduct)
            console.log(addProduct)
        }
    }
    catch (err) {
        console.log(err)
    }
})

//Getting(Reading) Data:
router.get('/products', async (req, res) => {

    try {
        const getProducts = await products.find({})
        console.log(getProducts);
        res.status(201).json(getProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Getting(Reading) individual Data:
router.get('/products/:id', async (req, res) => {

    try {
        const getProduct = await products.findById(req.params.id);
        console.log(getProduct);
        res.status(201).json(getProduct);
    }
    catch (err) {
        console.log(err);
    }
})

//Editing(Updating) Data:
router.put('/updateproduct/:id', async (req, res) => {
    const { ProductName, ProductPrice, ProductBarcode, ProductStock, ProductSold } = req.body;

    try {
        const updateProducts = await products.findByIdAndUpdate(req.params.id, { ProductName, ProductPrice, ProductBarcode, ProductStock, ProductSold }, { new: true });
        console.log("Data Updated");
        res.status(201).json(updateProducts);
    }
    catch (err) {
        console.log(err);
    }
})

//Deleting Data:
router.delete('/deleteproduct/:id', async (req, res) => {

    try {
        const deleteProduct = await products.findByIdAndDelete(req.params.id);
        console.log("Data Deleted");
        res.status(201).json(deleteProduct);
    }
    catch (err) {
        console.log(err);
    }
})


module.exports = router;