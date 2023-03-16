import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IPost from "../../items/IItems";
import { RootState } from "../store";


export const getPosts:any = createAsyncThunk("posts/getPosts", async () =>{
    return fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json()
    );
});

export const sendPosts:any = createAsyncThunk("posts/sendPosts", async (post:IPost) =>{
   const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",
            body: JSON.stringify(post),
            headers:{
                'Content-Type': 'application/json',
            },
        },
    );
    const data = await response.json();
    return data;
});

export const deletePost:any = createAsyncThunk("posts/deletePost", async(id:number)=>{
      await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { 
            method:"DELETE",
        });

        
        return id;
});

export const modifyPost:any = createAsyncThunk("posts/modifyPost", async(post:IPost) =>{
    console.log(post);
    
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: 1,
            title:post.title,
            body: post.body           
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
    },
    
})
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        return json;
    });
    return response;
});

const postSlice = createSlice({
    name:"posts",
    initialState:{
        posts:[],
        loading:false 
    },
    extraReducers:{
        // GET POST
        [getPosts.pending]:(state:any,action:any) =>{
            state.loading = true;
        },
        [getPosts.fulfilled]:(state:any,action:any) =>{
            state.loading = false;
            state.posts = action.payload;
        },
        [getPosts.rejected]:(state:any,action:any) =>{
            state.loading = false;
        },
        // SEND POST
        [sendPosts.pending]:(state:any,action:any) =>{
            state.loading = true;
        },
        [sendPosts.fulfilled]:(state:any,action:any) =>{
            state.loading = false;
            console.log(action.payload);
            state.posts.push(action.payload);
            console.log("ok");
            
        },
        [sendPosts.rejected]:(state:any,action:any) =>{
            state.loading = false;
            console.log("rejected");
            
        },
        // DELETE POST
        [deletePost.pending]:(state:any,action:any) =>{
            state.loading = true;
        },
        [deletePost.fulfilled]:(state:any,action:any) =>{
            state.loading = false;
            console.log(action.payload);
          const newPosts = state.posts.filter((post:IPost) => {
                return post.id !== action.payload;
                
            });
            state.posts = newPosts;
            console.log("deleted");    
        },
        [deletePost.rejected]:(state:any,action:any) =>{
            state.loading = false;  
        },
        // PATCH POST
        [modifyPost.pending]:(state:any,action:any) =>{
            state.loading = true;
        },
        [modifyPost.fulfilled]:(state:any,action:any) =>{
            state.loading = false;
           const index:number = state.posts.findIndex((post:IPost) => {
                console.log(action.payload);
                
                return post.id === action.payload.id;
           })
           console.log(index);
           
           state.posts.splice(index,1,action.payload); 
            
        },
        [modifyPost.rejected]:(state:any,action:any) =>{
            state.loading = false;
        },
    },
    reducers:{     
    }
});

export const selectPosts =  (state: RootState) => state.post;
export default postSlice.reducer;