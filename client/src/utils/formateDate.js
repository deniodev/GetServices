const formateDate = (date, config) => {
  const defaultOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const options = config || defaultOptions;

  return new Date(date).toLocaleDateString('en-US', options);
};

export default formateDate;
