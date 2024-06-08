
import toast from 'react-hot-toast'

export  function ToastSuccess(message:string){
return  toast.success(message, {
    duration:2000,  position: 'bottom-center',
})
}

export  function ToastError(message:string){
return  toast.error(message, {
    duration:2000,  position: 'bottom-center',
})
}
