import { type Dialog } from './types'

export const useDialog = () => {

  function initDialog(dl: Dialog) {
    /**
     * <dialog id="dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ dialog.title }}</h3>
        <p class="py-4">{{ dialog.message }}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">{{ dialog.closeBtn }}</button>
          </form>
        </div>
      </div>
    </dialog>
     */
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
          <button class="btn" onClick="() => console.log('${dialogId}');document.getElementById('${dialogId}')?.remove()">${dl.closeBtn}</button>
        </form>
      </div>
    </div>`
    document.body.appendChild(dialog)

    // @ts-ignore
    document.getElementById(dialogId)?.showModal()
  }

  function closeDialog(id: string) {
    document.getElementById(id)?.remove()
  }

  return {
    initDialog,
  }
}