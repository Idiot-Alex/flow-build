import { useHandleConnections, useVueFlow, type GraphNode } from '@vue-flow/core'
import { toRef } from 'vue'

const statusMap = {
  sender: {
    emoji: '📦',
    tip: '开始节点',
  },
  processor:{
    emoji: '🏠',
    tip: '待执行节点',
  },
  skipped: {
    emoji: '🚧',
    tip: '未处理',
  },
  cancelled: {
    emoji: '🚫',
    tip: '被取消',
  },
  finished: {
    emoji: '😎',
    tip: '处理完成',
  },
  error: {
    emoji: '❌',
    tip: '处理失败',
  }
}

export function useNodeStatus() {
  const { findNode } = useVueFlow()

  const sourceConnections = useHandleConnections({
    type: 'target',
  })

  const targetConnections = useHandleConnections({
    type: 'source',
  })

  const isSender = toRef(() => sourceConnections.value.length <= 0)

  const isReceiver = toRef(() => targetConnections.value.length <= 0)

  function getNodeStatus(nodeId: string) {
    const node: GraphNode = findNode(nodeId) as GraphNode
    if (node.data.hasError) {
      return toRef(statusMap.error)
    }
    if (node.data.isSkipped) {
      return toRef(statusMap.skipped)
    }
    if (node.data.isCancelled) {
      return toRef(statusMap.cancelled)
    }
    if (isSender.value) {
      return toRef(statusMap.sender)
    }
    if (node.data.isFinished) {
      return toRef(statusMap.finished)
    }
    return toRef(statusMap.processor)
  }

  return { getNodeStatus, isSender, isReceiver }
}