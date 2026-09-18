import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

export default function Products() {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search')?.toLowerCase() || '';
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    const [productData, setProductData] = useState([]);

    const getProducts = async (e) => {

        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setProductData(data);
            }
            else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteProduct = async (id) => {

        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Product deleted");
            getProducts();
        }

    }

    const filteredProducts = productData.filter((product) =>
        product.ProductName.toLowerCase().includes(searchTerm) ||
        String(product.ProductBarcode).includes(searchTerm)
    );

    const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;
    const getFinancials = (product) => {
        const sold = Number(product.ProductSold || 0);
        const revenue = Number(product.ProductPrice || 0) * sold;
        const cost = Number(product.ProductBuyPrice || 0) * sold;
        return { sold, revenue, cost, result: revenue - cost };
    };

    const chartMax = Math.max(
        ...filteredProducts.flatMap((product) => {
            const { revenue, cost } = getFinancials(product);
            return [revenue, cost];
        }),
        1
    );

    return (
        <>


            <div className='container-fluid p-5'>
                <h1>Products Inventory</h1>
                <div className='add_button'>
                    <button type="button" className='btn btn-dark fs-5 me-2' onClick={() => setShowChart(!showChart)}>
                        {showChart ? 'Hide Chart' : 'View Chart'}
                    </button>
                    <NavLink to="/insertproduct" className='btn btn-primary fs-5'> + Add New Product</NavLink>
                </div>
                {showChart && <section className='inventory_chart mt-4'>
                    <div className='inventory_chart_header'>
                        <div>
                            <h2>Profit and Loss by Product</h2>
                            <p>Based on selling price, buy price, and sold quantity.</p>
                        </div>
                    </div>
                    {filteredProducts.length === 0 && <p className='text-muted'>Add products to see the chart.</p>}
                    <div className='chart_grid'>
                        {filteredProducts.map((product) => {
                            const { sold, revenue, cost, result } = getFinancials(product);
                            return <article className='chart_product' key={`chart-${product._id}`}>
                                <div className='chart_product_title'>
                                    <h3>{product.ProductName}</h3>
                                    <strong className={result >= 0 ? 'profit_value' : 'loss_value'}>
                                        {result >= 0 ? 'Profit ' : 'Loss '}{formatMoney(Math.abs(result))}
                                    </strong>
                                </div>
                                <p>{sold} item{sold === 1 ? '' : 's'} sold</p>
                                <div className='chart_metric'><span>Revenue</span><b>{formatMoney(revenue)}</b></div>
                                <div className='chart_bar'><span className='revenue_bar' style={{ width: `${(revenue / chartMax) * 100}%` }} /></div>
                                <div className='chart_metric'><span>Cost</span><b>{formatMoney(cost)}</b></div>
                                <div className='chart_bar'><span className='cost_bar' style={{ width: `${(cost / chartMax) * 100}%` }} /></div>
                            </article>;
                        })}
                    </div>
                </section>}
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Buy Price</th>
                                <th scope="col">Product Barcode</th>
                                <th scope="col">Still Left</th>
                                <th scope="col">Sold</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filteredProducts.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.ProductName}</td>
                                                <td>{element.ProductPrice}</td>
                                                <td>{element.ProductBuyPrice || 0}</td>
                                                <td>{element.ProductBarcode}</td>
                                                <td>{element.ProductStock || 0}</td>
                                                <td>{element.ProductSold || 0}</td>

                                                <td><NavLink to={`/updateproduct/${element._id}`} className="btn btn-primary"><i className="fa-solid fa-pen-to-square"></i></NavLink></td>
                                                <td><button className="btn btn-danger" onClick={() => deleteProduct(element._id)}><i class="fa-solid fa-trash"></i></button></td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                            {filteredProducts.length === 0 && <tr><td colSpan="9" className="text-center">No products found.</td></tr>}

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}
