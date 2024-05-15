const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  data: [
    // {
    //   id: 1,
    //   title: 'Item 1',
    //   description: 'Description for Item 1',
    //   image: require('../assets/icon/icon.png'),
    //   credit: true,
    //   amount: 1000,
    //   date: '2024-05-08T10:30:29.161Z',
    // },
    // {
    //   id: 2,
    //   title: 'Item 2',
    //   description: 'Description for Item 2',
    //   image: require('../assets/icon/icon2.png'),
    //   credit: true,
    //   amount: 1500,
    //   date: '2024-05-07T10:30:29.161Z',
    // },
    // {
    //   id: 3,
    //   title: 'Item 3',
    //   description: 'Description for Item 3',
    //   image: require('../assets/icon/icon3.png'),
    //   credit: true,
    //   amount: 2500,
    //   date: '2024-05-08T10:30:29.161Z',
    // },
  ],
  amount: 0,
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    Add(state, action) {
      console.log('THIS IS PAYLOAD ::: ', action.payload);
      state.data.push(action.payload);
      action.payload.credit
        ? (state.amount += +action.payload.amount)
        : (state.amount -= +action.payload.amount);
    },
    Remove(state, action) {
      state.amount -= action.payload.amount;
      state.data = state.data.filter(item => item.id !== action.payload.id);
    },
    Update(state, action) {
      state.data = state.data.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.updatedData,
          };
        }
        return item;
      });
    },
  },
});

export const DataAction = DataSlice.actions;
export default DataSlice.reducer;
