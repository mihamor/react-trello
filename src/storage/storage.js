const MyStorage = {
  saveDataToCollection(data){
    const dataStr = JSON.stringify(data);
    localStorage.setItem("data", dataStr);
  },
  initializeStorage(){
    const newData = {
      nextId : 0,
      collection : []
    };
    this.saveDataToCollection(newData);
    return newData;    
  },
  getData(){
    const dataStr = localStorage.getItem("data");
    if(!dataStr){
      const newData = this.initializeStorage();
      return newData;
    }
    const data = JSON.parse(dataStr);
    return data;
  },
  getCollection(){
    const data = this.getData();
    return data.collection;
  },
  insertNewItem(item){
    const data = this.getData();
    const newId = data.nextId;
    item.id = newId;

    data.collection.push(item);
    data.nextId++;
    this.saveDataToCollection(data);

    return data.collection;
  },
  getNextId(){
    const data = this.getData();
    return data.nextId;
  },
  deleteItemById(id){
    const data = this.getData();
    data.collection = data.collection.filter((item) => item.id !== id );
    this.saveDataToCollection(data);
    return data.collection;
  },
  getItemById(id){
    const validId = Number(id);
    const err_msg = "Wasn't found";

    if(isNaN(validId)) return { error: err_msg };

    const data = this.getData();
    const filteredCollection = data.collection.filter((item) => item.id === validId );
    const wasFound = filteredCollection.length !== 0;
    const result = {
      error : !wasFound ? err_msg : null,
      item : wasFound ? filteredCollection[0] : null
    }
    return result;
  }
}

MyStorage.saveDataToCollection = MyStorage.saveDataToCollection.bind(MyStorage);
MyStorage.initializeStorage = MyStorage.initializeStorage.bind(MyStorage);
MyStorage.getCollection = MyStorage.getCollection.bind(MyStorage);
MyStorage.insertNewItem = MyStorage.insertNewItem.bind(MyStorage);
MyStorage.deleteItemById = MyStorage.deleteItemById.bind(MyStorage);
MyStorage.getItemById = MyStorage.getItemById.bind(MyStorage);
MyStorage.getNextId = MyStorage.getNextId.bind(MyStorage);

export default MyStorage;
