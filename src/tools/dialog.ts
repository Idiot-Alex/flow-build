import { type Dialog } from './types'

export const useDialog = () => {

  function showDialog(dl: Dialog) {
    // init dialog id
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    const dialogId: string = 'dialog-' + new Date().getTime() + randomNum

    const dialog = document.createElement('dialog')
    dialog.id = dialogId
    dialog.className = 'modal modal-bottom sm:modal-middle'
    dialog.innerHTML = `<div class="modal-box">
      <h3 class="text-lg font-bold">${dl.title}</h3>
      <p class="py-4">${dl.message}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          ${typeof dl.confirmBtn === 'undefined' ? '' : `<button class="btn btn-primary" id="confirmBtn-${dialogId}">${dl.confirmBtn}</button>`}
          <button class="btn" onClick="document.getElementById('${dialogId}')?.remove()">${dl.closeBtn}</button>
        </form>
      </div>
    </div>`
    document.body.appendChild(dialog)

    // 动态绑定 confirmBtn 的 click 事件
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

  function closeDialog(dialogId: string) {
    document.getElementById(dialogId)?.remove()
  }

  return {
    showDialog,
  }
}
