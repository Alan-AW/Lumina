interface shopProps {
    node: any;
    isMask: boolean;
  }

let dialogRef:any={};



function initDialog(ref:any){
    dialogRef=ref
}

function dialogOpen(data:shopProps){
    dialogRef.showModal(data)
}
function dialogClose(){
    dialogRef.closeModal()
}

const DialogServer={
    dialogOpen,
    dialogClose,
    initDialog:(ref:any)=>{
        dialogRef=ref
    },
}

export default DialogServer