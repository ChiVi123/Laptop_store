import accountTokenSlice from './account.token';
import cartSlice from './cart';
import categorySlice from './category';

export const { resetAccountToken, setAccountToken } = accountTokenSlice.actions;
export const { selectAccountToken } = accountTokenSlice.selectors;
export const { selectCartSize } = cartSlice.selectors;
export const { setCartSize, resetCartSize } = cartSlice.actions;
export const { setDefaultCategory } = categorySlice.actions;
export const { selectDefaultCategory } = categorySlice.selectors;
