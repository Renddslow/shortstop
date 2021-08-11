const deleteItem = (type: 'agenda' | 'action', id: string) => {
  return fetch(`/api/${type}-items/${id}`, {
    method: 'DELETE',
  });
};

export default deleteItem;
