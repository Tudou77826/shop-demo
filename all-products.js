document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const categorySelect = document.getElementById('category');
    const priceSelect = document.getElementById('price');
    const sortSelect = document.getElementById('sort');
    const productGrid = document.querySelector('.product-grid');

    // 分类映射
    const categoryMap = {
        'decoration': '装饰品',
        'gift': '礼品',
        'stationery': '文具'
    };

    // 模拟产品数据（实际应用中，这些数据应该从服务器获取）
    let products = [
        { name: "喜字门贴", category: "decoration", price: 9.99, image: "resource/flowImages/image1.jpg" },
        { name: "礼宾花", category: "gift", price: 12.90, image: "resource/flowImages/image2.jpg" },
        { name: "精美红包", category: "gift", price: 15.90, image: "resource/flowImages/image3.jpg" },
        // 添加更多产品...
    ];

    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        productsToRender.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <span class="category">${categoryMap[product.category] || product.category}</span>
                    <h3>${product.name}</h3>
                </div>
                <p class="price">¥${product.price.toFixed(2)}</p>
                <button class="view-details">查看详情</button>
            `;
            productGrid.appendChild(productElement);
        });
    }

    function filterProducts() {
        let filteredProducts = products;

        // 搜索过滤
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm)
            );
        }

        // 类别过滤
        const selectedCategory = categorySelect.value;
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => 
                product.category === selectedCategory
            );
        }

        // 价格过滤
        const selectedPrice = priceSelect.value;
        if (selectedPrice) {
            const [min, max] = selectedPrice.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => 
                product.price >= min && (max ? product.price <= max : true)
            );
        }

        // 排序
        const sortMethod = sortSelect.value;
        if (sortMethod === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortMethod === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        // 可以添加更多排序方法...

        renderProducts(filteredProducts);
    }

    // 添加事件监听器
    searchButton.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterProducts();
        }
    });
    categorySelect.addEventListener('change', filterProducts);
    priceSelect.addEventListener('change', filterProducts);
    sortSelect.addEventListener('change', filterProducts);

    // 初始渲染
    renderProducts(products);
});