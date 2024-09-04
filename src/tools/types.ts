export type NodeState = {
  emoji: string,
  tip: string,
}

export type NodeDataStatus = 'isSkipped' | 'isFinished' | 'isCancelled' | 'isRunning' | 'hasError'

export type Res = {
  code: string,
  msg: string,
  page?: number,
  size?: number,
  pages?: number,
  total?: number,
  data?: any,
}

export type Breadcrumb = {
  title: string,
  path: string,
}

