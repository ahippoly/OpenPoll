export const uploadBackend = async (body: object) => {
  console.log('🚀 ~ file: uploadBackend.ts:2 ~ uploadBackend ~ body:', body)
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  const { cid, name } = await res.json()

  return { cid, name }
}
