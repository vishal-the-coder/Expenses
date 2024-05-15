const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    users:[],
    activeUsers:[],
    flag:false,
};

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login(){}
    }
})

export const userAction = UserSlice.actions;
export default UserSlice.reducer;