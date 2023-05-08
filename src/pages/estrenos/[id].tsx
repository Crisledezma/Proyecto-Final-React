import { useRouter } from 'next/router'
import React from 'react'

function EstrenoPorId() {
  const router = useRouter()
  const { id } = router.query;
  return (
    <div>Película con id: {id}</div>
  )
}

export default EstrenoPorId