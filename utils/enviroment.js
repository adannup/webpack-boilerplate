const isProductionENV = () => process.env.NODE_ENV === 'production';

const getProjectName = () => {
  const defaultProjectName = 'Document';
  return process && process.env && process.env.NODE_NAME
    ? process.env.NODE_NAME
    : defaultProjectName;
};

module.exports = {
  getProjectName,
  isProductionENV,
};
