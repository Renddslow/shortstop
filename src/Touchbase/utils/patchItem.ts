const patchItem = (
  type: 'agenda' | 'action',
  id: string,
  key: string,
  item: Record<string, any>,
) => {
  return fetch(`/api/${type}-items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      op: 'replace',
      path: `/${key}`,
      value: !item[key],
    }),
  })
    .then((d) => d.json())
    .then((d) => ({
      id: d.data.id,
      ...d.data.attributes,
    }));
};

export default patchItem;
