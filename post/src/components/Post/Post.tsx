import { Box, Button, TextField } from "@mui/material";
import { IPost } from "./PostProps";

export default function Post(props: IPost): JSX.Element {

  return (
    
    <div className="postWrapper">
     

      <Box
        component="form"
        sx={props.style}
        noValidate
        autoComplete="off"
      >
         <h2 className="postH2">{props.open ? "Modify Post" : "Add post"}</h2>

        <TextField
          value={props.newTitle}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onChangeTitle(event.target.value)
          }
          label="title"
          variant="outlined"
        />
        <TextField
          className="text"
          value={props.newBody}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onChangeBody(event.target.value)
          }
          label="body"
          variant="outlined"
        />

        {props.open ? (
          <Button
              className="buttonModal"
              variant="contained"
              onClick={() => {
              props.changePost();
              props.handleClose();
            }}
          >
            ok
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              props.createPost();
            }}
            className="newPost"
          >
            New Post
          </Button>
        )}
      </Box>
    </div>
  );
}
