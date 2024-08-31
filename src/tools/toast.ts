
export function useToast() {

  const stateMap = {
    success: 'alert-success',
    info: 'alert-info',
    error: 'alert-error',
  }

  // toast show with success
  function showSuccess(msg: string, millseconds: number = 1500) {
    initToast(stateMap.success, msg, millseconds)
  }

  // toast show with info
  function showInfo(msg: string, millseconds: number = 1500) {
    initToast(stateMap.info, msg, millseconds)
  }

  // toast show with error
  function showError(msg: string, millseconds: number = 1500) {
    initToast(stateMap.error, msg, millseconds)
  }

  // init toast
  function initToast(state: string, msg: string, millseconds: number) {
    // init toast id
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const toastId = new Date().getTime() + randomNum
    const toast = document.createElement('div')

    // init toast div
    toast.innerHTML = `<div class="toast toast-bottom toast-end" id="${toastId}">
      <div class="alert ${state}">
        <span>${msg}</span>
      </div>
    </div>`
    document.body.appendChild(toast)

    // destroy toast
    setTimeout(() => {
      document.getElementById(toastId)?.remove()
    }, millseconds)
  }


  return  { showSuccess, showInfo, showError }
}