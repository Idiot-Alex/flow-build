export type NodeState = {
  emoji: string,
  tip: string,
}

export type NodeDataStatus = 'isSkipped' | 'isFinished' | 'isCancelled' | 'isRunning' | 'hasError'