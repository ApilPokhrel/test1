exports.paging = (query) => {
  let limit = parseInt(query?.limit) || 10;
  let start = parseInt(query?.start) || 0;
  return { limit, start };
};
