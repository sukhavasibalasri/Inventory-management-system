import React from 'react'

export default function About() {
  return (
    <div className='container-fluid p-5'>
        <h1>Inventory Management System - MERN CRUD App</h1>
      <p className='lead'>IMS is a web application for organizing products and keeping inventory information easy to manage.</p>
      <h2>What This Website Does</h2>
      <p>Users can create an account, sign in securely, and manage their product catalog from one workspace.</p>
      <ul>
        <li>Add products with a name, price, barcode, available stock, and sold quantity.</li>
        <li>View all inventory records in a searchable table.</li>
        <li>Update product information when stock or sales change.</li>
        <li>Delete products that are no longer part of the catalog.</li>
        <li>Track how many items are still available and how many have been sold.</li>
      </ul>
      <h2>Who Can Use It</h2>
      <p>This system is useful for small shops, student projects, store managers, and anyone who needs a simple product inventory tracker.</p>
      <h2>Project Author</h2>
      <p>Name: Sukhavasi Bala Sri</p>
      <p>Email: sukhavasibalasri@gmail.com</p>
      <p>College: Prasad V Potluri Siddhartha College</p>
      <h2>Technologies Used</h2>
      <ul>
        <li>React.js</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>Mongoose</li>
        <li>Axios</li>
        <li>React Router</li>
        <li>Bootstrap and CSS</li>
      </ul>
    </div>
  )
}
