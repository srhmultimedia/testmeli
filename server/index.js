import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

const getCategory = async (category) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/categories/${category}`);
    return response.data.path_from_root.map((category) => category);
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
};

const getDescription = async (id) => {
  try {
    const response = await axios.get(`https://api.mercadolibre.com/items/${id}/description`);
    return response.data.plain_text;
  } catch (error) {
    console.error('Error getting product description:', error);
    return "";
  }
};

const mostFrequent = (arr) => {
  const counts = {};
  let maxCount = 0;
  let mostFrequentElement;
  arr.forEach((element) => {
    counts[element] = (counts[element] || 0) + 1;
    if (counts[element] > maxCount) {
      maxCount = counts[element];
      mostFrequentElement = element;
    }
  });
  return mostFrequentElement;
};

app.get("/api/items", async (req, res) => {
  const queryParams = req.query;
  if (!queryParams || !queryParams.q) {
    return res.send("Not query params");
  }

  try {
    const toSearch = queryParams.q;
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${toSearch}`);
    const responseAPI = {
      author: { name: "Sebastian", lastname: "Ramirez" },
      categories: [],
      items: []
    };

    const categoriesArray = [];
    const items = response.data.results.slice(0, 4);
    const itemsResponseAPI = items.map((result) => {
      categoriesArray.push(result.category_id);
      return {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price,
          decimals: result.price.toString().includes('.') ? result.price.toString().split('.')[1].length : 0
        },
        picture: result.thumbnail,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping
      };
    });

    const categories = response.data.filters.find((filter) => filter.id === 'category');
    if (categories) {
      const categoriesResponseAPI = categories.values[0]?.path_from_root.map((category) => category) || [];
      responseAPI.categories = categoriesResponseAPI;
      responseAPI.items = itemsResponseAPI;
      res.json(responseAPI);
    } else {
      const categoryMostFrequent = mostFrequent(categoriesArray);
      if (categoryMostFrequent) {
        const categories = await getCategory(categoryMostFrequent);
        responseAPI.categories = categories;
        responseAPI.items = itemsResponseAPI;
        res.json(responseAPI);
      } else {
        res.json(responseAPI);
      }
    }
  } catch (error) {
    console.error('Request error:', error);
    res.status(500).json({ error: 'Request error' });
  }

});

app.get("/api/items/:id", async (req, res) => {
  const path = req.params.id;
  if (!path) {
    return res.send("Not item id");
  }

  const responseAPI = {
    author: { name: "Sebastian", lastname: "Ramirez" },
    item: {
    }
  }

  try {
    const response = await axios.get(`https://api.mercadolibre.com/items/${path}`);
    const item = response.data;
    responseAPI.item = {
      id: item.id,
      title: item.title,
      categories: await getCategory(item.category_id),
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: item.price.currency
      },
      picture: item.pictures[0].url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.initial_quantity,
      description: await getDescription(path)
    }
    res.json(responseAPI)
  } catch (error) {
    console.error('Request error:', error);
    res.status(500).json({ error: 'Request error' });
  }

})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

export default app;