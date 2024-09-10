import { type Dialog } from './types'

export const useDialog = () => {

  function showDialog(dl: Dialog) {
    // init dialog id
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const dialogId: string = 'dialog-' + new Date().getTime() + randomNum

    const dialog = document.createElement('dialog')
    dialog.id = dialogId
    dialog.className = 'modal modal-middle'
    dialog.innerHTML = `<div class="modal-box">
      <h3 class="text-lg font-bold">${dl.title}</h3>
      <p class="py-4">${dl.message}</p>
      <div class="modal-action">
        ${typeof dl.confirmBtn === 'undefined' ? '' : `<button class="btn btn-primary" id="confirmBtn-${dialogId}">${dl.confirmBtn}</button>`}
        <button class="btn" id="closeBtn-${dialogId}">${dl.closeBtn}</button>
      </div>
    </div>`
    document.body.appendChild(dialog)

    // bind closeBtn click event
    const closeBtn = dialog.querySelector(`#closeBtn-${dialogId}`) as HTMLElement | null
    if (closeBtn) {
      closeBtn.addEventListener('click', async (event) => {
        closeDialog(dialogId)
      })
    }

    // bind confirmBtn click event
    if (dl.confirmBtn) {
      const confirmBtn = dialog.querySelector(`#confirmBtn-${dialogId}`) as HTMLElement | null
      if (confirmBtn) {
        confirmBtn.addEventListener('click', async (event) => {
          if (dl.confirmFunc) {
            await dl.confirmFunc(event)
            closeDialog(dialogId)
          }
        })
      }
    }

    // @ts-ignore
    document.getElementById(dialogId)?.showModal()
  }

  function showLoading(message: string = '正在加载中...', millseconds: number = 5000): string {
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const dialogId: string = 'dialog-' + new Date().getTime() + randomNum

    const dialog = document.createElement('dialog')
    dialog.id = dialogId
    dialog.className = 'modal modal-middle'
    dialog.innerHTML = `<div class="modal-box w-auto">
      <div class="flex flex-col gap-2 flex-items-center">
        <span class="loading loading-infinity loading-lg"></span>
        <span>${message}</span>
      </div>
    </div>`
    document.body.appendChild(dialog)

    // @ts-ignore
    document.getElementById(dialogId)?.showModal()

    // destory dialog loading
    setTimeout(() => {
      closeDialog(dialogId)
    }, millseconds)
    
    return dialogId
  }

  function closeDialog(dialogId: string) {
    document.getElementById(dialogId)?.remove()
  }

  return {
    showDialog,
    showLoading,
    closeDialog,
  }
}
