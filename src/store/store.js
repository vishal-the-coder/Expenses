import DataSlice from './DataSlice';
import UserSlice from './UserSlice';

const {configureStore} = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    user: UserSlice,
    data: DataSlice,
  },
});

export default store;

