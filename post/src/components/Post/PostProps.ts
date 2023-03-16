export interface IPost{
    handleClose:() => void;
    changePost:() => void;
    onChangeTitle:(title:string) => void;
    onChangeBody:(body:string) => void;
    createPost():any;
    style?:any;
    open:boolean;
    newTitle: string;
    newBody: string;
    idToPatch:number;
}