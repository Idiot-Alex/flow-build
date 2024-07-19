import { ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { defineStore } from 'pinia'

export const useDragAndDropStore = defineStore('dragAndDrop', () => {
  const draggedType = ref(null)
  const isDragOver = ref(false)
  const isDragging = ref(false)

  const { addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode } = useVueFlow()

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : ''
  })

  let id = 0
  const getId = () => {
    return `dndnode_${id++}`
  }

  const onDragStart = (event: DragEvent, type: any) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type)
      event.dataTransfer.effectAllowed = 'move'
    }

    draggedType.value = type
    isDragging.value = true

    document.addEventListener('drop', onDragEnd)
  }

   /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  const onDragOver = (event: DragEvent) => {
    event.preventDefault()

    if (draggedType.value) {
      isDragOver.value = true

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
      }
    }
  }

  const onDragLeave = () => {
    isDragOver.value = false
  }

  const onDragEnd = () => {
    isDragging.value = false
    isDragOver.value = false
    draggedType.value = null
    document.removeEventListener('drop', onDragEnd)
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  const onDrop = (event: DragEvent) => {
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    })

    const nodeId = getId()

    const newNode: any = {
      id: nodeId,
      type: draggedType.value,
      position,
      data: { label: nodeId },
    }

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }))

      off()
    })

    addNodes(newNode)
  }

  return { 
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
})
