import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from '../admin/apiAdmin';
import Checkbox from './Checkbox';
import { prices } from './fixedPrices';
import RadioBox from './RadioBox';
import { getFilteredProducts } from './apiCore';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    //number of products
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        loadCategories()
        loadFilteredResults(skip, limit, myFilters.filters)

    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log("shop", filters, filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters
        // console.log(newFilters.filters[filterBy])

        if (filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        setMyFilters(newFilters)
        loadFilteredResults(myFilters.filters)
    };

    const handlePrice = (priceId) => {
        const data = prices
        let array = []
        let i
        for (i = 0; i < data.length; i++) {
            if (data[i]._id == parseInt(priceId)) {
                array = data[i].array
            }
        }
        return array;

    }

    const loadFilteredResults = (newFilters) => {
        // console.log(newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                console.log(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                // console.log(data.size)
                //size= size each time loadMore request, not size of all product fetched
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };


    return (
        <Layout title="Shop page" description="Search and find your book" className='container-fluid' >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by categories</h4>
                    <Checkbox
                        categories={categories}
                        handleFilters={(filters) =>
                            handleFilters(filters, 'category')}
                    />

                    <h4>Filter by price range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={(filters) =>
                                handleFilters(filters, 'price')}
                        />
                    </div>
                </div>

                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    {/* {JSON.stringify(filteredResults)} */}
                    <div className="row">
                        {filteredResults.map((product, i) => (

                            <Card key={i} product={product} />
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>

            </div>
        </Layout>
    )
}

export default Shop;