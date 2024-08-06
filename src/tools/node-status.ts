import { useHandleConnections, useVueFlow, type GraphNode } from '@vue-flow/core'
import { toRef } from 'vue'
import { type NodeState, type NodeDataStatus } from './types'

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
  const { findNode, updateNode } = useVueFlow()

  const sourceConnections = useHandleConnections({
    type: 'target',
  })

  const targetConnections = useHandleConnections({
    type: 'source',
  })

  const isSender = toRef(() => sourceConnections.value.length <= 0)

  const isReceiver = toRef(() => targetConnections.value.length <= 0)

  function getNodeStatus(nodeId: string): NodeState {
    const node: GraphNode = findNode(nodeId) as GraphNode
    if (node.data.hasError) {
      return statusMap.error
    }
    if (node.data.isSkipped) {
      return statusMap.skipped
    }
    if (node.data.isCancelled) {
      return statusMap.cancelled
    }
    if (isSender.value) {
      return statusMap.sender
    }
    if (node.data.isFinished) {
      return statusMap.finished
    }
    return statusMap.processor
  }

  function resetNodeStatus(nodeId: string) {
    const node = findNode(nodeId) as GraphNode
    node.data = {
      ...node.data,
      isSkipped: false,
      isFinished: false,
      isCancelled: false,
      hasError: false,
      loading: false,
    }
    updateNode(nodeId, node)
  }

  function setNodeLoading(nodeId: string, loading = true) {
    if (loading) {
      resetNodeStatus(nodeId)
    }
    const node = findNode(nodeId) as GraphNode
    node.data = {
      ...node.data,
      loading,
    }
    updateNode(nodeId, node)
  }

  function setNodeStatus(nodeId: string, status: NodeDataStatus) {
    resetNodeStatus(nodeId)
    const node = findNode(nodeId) as GraphNode
    node.data[status] = true
    console.log(node.data)
    updateNode(nodeId, node)
  }
  return { getNodeStatus, setNodeLoading, setNodeStatus, isSender, isReceiver }
}