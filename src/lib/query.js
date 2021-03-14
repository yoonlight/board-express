const pagination = (query) => {
  const { offset, limit } = query
  const perPage = parseInt(limit)
  const pageNum = (parseInt(offset) - 1) * perPage
  return { perPage, pageNum }
}

const search = (query, result, count) => {
  const { complete, search, field } = query
  const searchQuery = search != undefined && field != undefined

  if (complete != undefined) {
    count.where('complete').equals(complete)
    result.where('complete').equals(complete)
  }

  if (searchQuery) {
    count.where(field).regex(search)
    result.where(field).regex(search)
  }

  return { result, count }
}

export { pagination, search }
