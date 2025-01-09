function transformData(produtData) {
  return produtData.reduce(
    (acc, item) => {
      switch (item.attributes.category) {
        case 'doces':
          acc.doces.push(item);
          break;
        case 'salgados':
          acc.salgados.push(item);
          break;
        case 'cup':
          acc.cup.push(item);
          break;
        default:
          throw new Error('Erro');
      }
      return acc;
    },
    {
      doces: [],
      salgados: [],
      cup: [],
    }
  );
}
export default transformData;
