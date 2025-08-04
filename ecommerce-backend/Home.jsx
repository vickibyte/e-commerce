useEffect(() => {
  api.get('/products')
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
}, []);
