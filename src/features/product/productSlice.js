import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
  carts: [],
  recap: [],
  login: [],
  saved: [],
  amount: [],
  total: [],
};

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  if (JSON.parse(localStorage.getItem("products"))) {
    return JSON.parse(localStorage.getItem("products"));
  }
  const response = await axios.get(`https://fakestoreapi.com/products`);
  return response.data.map((item) => {
    if (!item.quantity) {
      item["stock"] = 10;
    }
    return item;
  });
});

export const loginUser = createAsyncThunk("products/loginUser", async ({ username, password, redirect, isLogin, notFound }) => {
  try {
    if (isLogin) {
      return isLogin;
    }
    if (username === "admin@bukapedia.com" && password === "admin123") {
      redirect({ role: "admin" });
      return { id: 99, role: "admin", user: username, login: true };
    }
    const resPost = await axios.post("https://fakestoreapi.com/auth/login", {
      username: username !== "" ? username : " ",
      password: password !== "" ? password : " ",
    });
    const resGet = await axios.get("https://fakestoreapi.com/users");
    let find = resGet.data.find((res) => res.username === username);

    if (resPost.data.token) {
      redirect({ role: "user" });
      return { id: find.id, role: "user", user: `${find.name.firstname} ${find.name.lastname}`, token: resPost.data.token, login: true };
    }
  } catch (error) {
    notFound(true);
    throw error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    updateStock: (state, action) => {
      const { id, stock } = action.payload;
      const productExist = state.products.find((item) => item.id === id);
      productExist.stock = stock;
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    cartsExist: (state, action) => {
      state.carts = action.payload;
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
    addCart: (state, action) => {
      const { carts, products, login } = state;
      const { id, quantity } = action.payload;
      const cartLogin = carts.filter((cart) => cart.idUser === login.id);
      const existCart = cartLogin.find((cart) => cart.product.idProduct === id);
      const existProduct = products.find((product) => product.id === id);
      if (existCart && existProduct) {
        const cartItem = carts.find((cart) => cart.product.idProduct === id);
        cartItem.product.quantity = quantity ? quantity : cartItem.product.quantity + 1;
        // existProduct.stock -= 1;
      } else {
        // existProduct.stock -= quantity;
        carts.push({ idUser: login.id, product: { idProduct: id, quantity: quantity } });
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      localStorage.setItem("products", JSON.stringify(products));
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const cartLogin = state.carts.filter((cart) => cart.idUser === state.login.id);
      const exist = cartLogin.find((cart) => cart.product.idProduct === id);
      const existProduct = state.products.find((product) => product.id === id);
      const existAmount = state.amount.find((item) => item.idUser === state.login.id);
      if (existAmount && existAmount.amount === 1) {
        state.amount = state.amount.filter((item) => item.idUser !== state.login.id);
      }
      if (existProduct && exist.product.quantity === 1) {
        state.carts = state.carts.filter((cart) => cart.product.idProduct !== id);
      } else {
        const cartItem = state.carts.find((cart) => cart.product.idProduct === id);
        cartItem.product.quantity = cartItem.product.quantity - 1;
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("amount", JSON.stringify(state.amount));
    },
    recapExist: (state, action) => {
      state.recap = action.payload;
      localStorage.setItem("recap", JSON.stringify(state.recap));
    },
    checkoutItem: (state, action) => {
      const product = [];
      action.payload.map((item) => product.push(item.product));
      state.recap.push({ id: state.recap.length + 1, idUser: state.login.id, product: product });
      const cartLogin = state.carts.filter((cart) => cart.idUser === state.login.id);
      for (let itemCart of cartLogin) {
        const existProduct = state.products.find((product) => product.id === itemCart.product.idProduct);
        if (existProduct) {
          existProduct.stock -= itemCart.product.quantity;
        }
      }
      state.carts = state.carts.filter((item) => item.idUser !== state.login.id);
      state.amount = state.amount.filter((item) => item.idUser !== state.login.id);
      localStorage.setItem("carts", JSON.stringify(state.carts));
      localStorage.setItem("recap", JSON.stringify(state.recap));
      localStorage.setItem("products", JSON.stringify(state.products));
      localStorage.setItem("amount", JSON.stringify(state.amount));
    },
    amountExist: (state, action) => {
      state.amount = action.payload;
      localStorage.setItem("amount", JSON.stringify(state.amount));
    },
    calculateTotal: (state, action) => {
      const cartLogin = state.carts.filter((cart) => cart.idUser === state.login.id);
      let amount = 0;
      let total = 0;
      if (cartLogin.length !== 0) {
        for (let item of cartLogin) {
          const cart = state.products.find((product) => product.id === item.product.idProduct);
          if (cart) {
            total += cart.price * item.product.quantity;
            amount += item.product.quantity;
          }
        }

        const amountLogin = state.amount.find((item) => item.idUser === state.login.id);
        if (amountLogin) {
          amountLogin.amount = amount;
          amountLogin.total = total;
        } else {
          state.amount.push({ idUser: state.login.id, amount: amount, total: total });
        }
        localStorage.setItem("amount", JSON.stringify(state.amount));
      }
    },
    saveExist: (state, action) => {
      state.saved = action.payload;
      localStorage.setItem("savedProduct", JSON.stringify(state.saved));
    },
    saveItem: (state, action) => {
      const { id } = action.payload;
      const saveLogin = state.saved.filter((save) => save.userId === state.login.id);
      if (saveLogin.length > 0) {
        const exist = saveLogin.find((item) => item.productId === id);
        if (!exist) {
          state.saved.push({ userId: state.login.id, productId: id });
        }
      } else {
        state.saved.push({ userId: state.login.id, productId: id });
      }
      localStorage.setItem("savedProduct", JSON.stringify(state.saved));
    },
    unSaveItem: (state, action) => {
      const { id } = action.payload;
      let saveLogin = state.saved.filter((save) => save.userId === state.login.id);
      if (saveLogin.length > 0) {
        state.saved = state.saved.filter((item) => item.userId !== state.login.id);
        saveLogin = saveLogin.filter((item) => item.productId !== id);
        state.saved = [...state.saved, ...saveLogin];
      }
      localStorage.setItem("savedProduct", JSON.stringify(state.saved));
    },
    logoutUser: (state, action) => {
      state.login = [];
      localStorage.removeItem("login");
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(action.payload));
    },
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
      state.login = [];
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
      localStorage.setItem("login", JSON.stringify(action.payload));
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { updateStock, addCart, removeItem, calculateTotal, recapExist, checkoutItem, logoutUser, amountExist, cartsExist, saveExist, saveItem, unSaveItem } = productSlice.actions;
export default productSlice.reducer;
