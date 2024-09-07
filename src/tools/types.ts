export type NodeState = {
  emoji: string,
  tip: string,
}
// 添加 ｜(string & {}) 会触发可选值的提示
export type NodeDataStatus = 'isSkipped' | 'isFinished' | 'isCancelled' | 'isRunning' | 'hasError' | (string & {})

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

export type Dialog = {
  title: string,
  message: string,
  closeBtn: string,
  confirmBtn?: string,
  confirmFunc?: Function
}

