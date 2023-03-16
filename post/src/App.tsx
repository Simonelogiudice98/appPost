import {
  Modal,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import {
  deletePost,
  getPosts,
  modifyPost,
  selectPosts,
  sendPosts,
} from "./app/features/postSlice";
import IPost from "./items/IItems";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import { Stack } from "@mui/system";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";

function App(): JSX.Element {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idToPatch, setIdToPatch] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const elementPerPage: number = 10;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height:"25%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",

  };

  const post = useSelector(selectPosts);
  const dispatch = useDispatch();

  const newPost: IPost = {
    userId: 1,
    title: newTitle,
    body: newBody,
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const createPost = () => {
    dispatch(sendPosts(newPost));
  };

  const onChangeTitle = (title: string) => {
    setNewTitle(title);
  };
  const onChangeBody = (body: string) => {
    setNewBody(body);
  };

  const changePost: any = () => {
    dispatch(modifyPost({ ...newPost, id: idToPatch }));
  };

  return (
    <div className="App">
      <Header />
      <div className="wrapper">
        <Modal
        className="modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="formContainer">
            <Post
              style={style}
              changePost={changePost}
              handleClose={handleClose}
              open={open}
              onChangeTitle={onChangeTitle}
              onChangeBody={onChangeBody}
              newTitle={newTitle}
              newBody={newBody}
              idToPatch={idToPatch}
              createPost={createPost}
            />
          </div>
        </Modal>

        <div className="formContainer">
          <div className="inputsWrapper">
            {!open && (
              <Post
                style={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                changePost={changePost}
                handleClose={handleClose}
                open={open}
                onChangeTitle={onChangeTitle}
                onChangeBody={onChangeBody}
                newTitle={newTitle}
                newBody={newBody}
                idToPatch={idToPatch}
                createPost={createPost}
              />
            )}
          </div>
        </div>

        <div className="postsContainer">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="inherit">Title</TableCell>
                  <TableCell align="inherit">Body</TableCell>
                  <TableCell align="inherit">Remove</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {post.posts
                  .slice(
                    (currentPage - 1) * elementPerPage,
                    currentPage * elementPerPage
                  )
                  .map((item: IPost) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.body}</TableCell>
                        <TableCell>
                          <SettingsIcon
                            color="primary"
                            className="changeIcon"
                            onClick={() => {
                              setIdToPatch(item.id ? item.id : 0);
                              handleOpen();
                            }}
                          />
                          <DeleteIcon
                            color="primary"
                            className="deleteIcon"
                            onClick={() => {
                              dispatch(deletePost(item.id));
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell 
                  align="center"
                  colSpan={4}
                  >
                    <Stack spacing={2}>
                      {
                        <Pagination
                          className="pagination"
                          color="primary"
                          count={Math.ceil(post.posts.length / elementPerPage)}
                          page={currentPage}
                          onChange={handleChange}
                        />
                      }
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
