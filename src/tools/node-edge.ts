import { markRaw } from 'vue'
import type { EdgeComponent, NodeComponent } from '@vue-flow/core'

import Animation from '@/components/edges/Animation.vue'

import Start from '@/components/nodes/Start.vue'
import Maven from '@/components/nodes/Maven.vue'
import Shell from '@/components/nodes/Shell.vue'
import Param from '@/components/nodes/Param.vue'
import Console from '@/components/nodes/Console.vue'

export const useNodeEdge = () => {

  const nodeTypes = {
    'start': markRaw(Start) as NodeComponent,
    'console': markRaw(Console) as NodeComponent,
    'maven': markRaw(Maven) as NodeComponent,
    'shell': markRaw(Shell) as NodeComponent,
    'param': markRaw(Param) as NodeComponent,
  }

  const nodeTypeNameMap = {
    'start': 'Start 节点',
    'console': 'Console 节点',
    'maven': 'Maven 节点',
    'shell': 'Shell 节点',
    'param': 'Param 节点',
  }

  const edgeTypes = {
    'animation': markRaw(Animation) as EdgeComponent,
  }

  return {
    nodeTypes,
    nodeTypeNameMap,
    edgeTypes,
  }
}