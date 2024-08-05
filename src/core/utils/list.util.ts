class ListUtil {
  static findItem = (items: any[], id: any, bind: string = 'ID') => {
    return items.find(item => item[bind] === id);
  };
}

export default ListUtil;
