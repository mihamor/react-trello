export function searchDeskInCache(collection, deskId) {
  const validId = Number(deskId);
  if (isNaN(validId) || !collection)
    return null;
  const filteredCollection = collection.filter((item) => item.id === validId);
  const wasFound = filteredCollection.length !== 0;
  return wasFound ? filteredCollection[0] : null;
}
