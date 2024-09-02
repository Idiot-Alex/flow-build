import { fetchWithTimeout } from '@/tools/http'

// save flow
export const saveFlow = async (flow: any): Promise<Response> => {
  const response = await fetchWithTimeout('/api/flow/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(flow),
  })
  return response.json()
}

// delete flow by id
export const deleteFlow = async (id: string): Promise<Response> => {
  const response = await fetchWithTimeout(`/api/flow/delete/${id}`, {
    method: 'POST',
  })
  return response.json()
}

// query flow with page
export const listFlow = async (page: number, pageSize: number, flow: any): Promise<Response> => {
  const response = await fetchWithTimeout(`/api/flow/list?page=${page}&size=${pageSize}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(flow),
  })
  return response.json()
}
