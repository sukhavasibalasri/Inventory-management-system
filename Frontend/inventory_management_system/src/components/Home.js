import React from 'react'

export default function Home() {
  return (
    <main className='home_page'>
      <section className='home_hero'>
        <div className='home_hero_content'>
          <p className='home_kicker'>SMARTER STOCK CONTROL</p>
          <h1>Inventory Management System <span>(IMS)</span></h1>
          <p className='home_intro'>Keep every product accounted for, organized, and ready for the next order.</p>
          <a className='home_cta' href='/products'>View Products</a>
        </div>
        <img
          className='home_hero_image'
          src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85'
          alt='Organized inventory shelves in a warehouse'
        />
      </section>

      <section className='home_features' aria-label='Inventory management features'>
        <article>
          <strong>01</strong>
          <h2>Track stock</h2>
          <p>See your complete product list in one place.</p>
        </article>
        <article>
          <strong>02</strong>
          <h2>Update quickly</h2>
          <p>Keep product details accurate as inventory changes.</p>
        </article>
        <article>
          <strong>03</strong>
          <h2>Stay organized</h2>
          <p>Manage your catalog with a simple, focused workflow.</p>
        </article>
      </section>
    </main>
  )
}
