const err_msg = "Wasn't found";

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
    item.nextSectionId = 0;
    item.sections = [];

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
    if(isNaN(validId)) return { error: err_msg };

    const data = this.getData();
    const filteredCollection = data.collection.filter((item) => item.id === validId );
    const wasFound = filteredCollection.length !== 0;
    const result = {
      error : !wasFound ? err_msg : null,
      item : wasFound ? filteredCollection[0] : null
    }
    return result;
  },
  initializeSection(section, id){
    return {
      ...section,
      nextCardId : 0,
      cards : [],
      id
    };
  },
  insertSection(itemId, newSection){
    const data = this.getData();
    const filteredCollectionData = this.filterOutById(data.collection, itemId);
    const wasFound = !filteredCollectionData.error;
    if(!wasFound) return { error: err_msg };
    const foundedItem = filteredCollectionData.item;

    newSection = this.initializeSection(newSection, foundedItem.nextSectionId);

    foundedItem.sections.push(newSection);
    foundedItem.nextSectionId++;

    this.saveDataToCollection(data);

    const result = {
      error : !wasFound ? err_msg : null,
      addedSection : newSection,
      newCollection : data.collection,
      newItemOnFocus : foundedItem,
    }
    return result;
  },
  filterOutById(array, itemId){
    const validItemId = Number(itemId);
    if(isNaN(validItemId)) return { error: err_msg };
    const filteredCollection = array.filter((item) => item.id === validItemId );
    const wasFoundItem = filteredCollection.length !== 0;
    if(!wasFoundItem) return { error: err_msg };

    const foundedItem = filteredCollection[0];
    return { item : foundedItem };
  },
  insertCard(itemId, sectionId, newCard){
    const data = this.getData();
    const filteredCollectionData = this.filterOutById(data.collection, itemId);
    const wasFoundItem = !filteredCollectionData.error;
    if(!wasFoundItem) return { error: err_msg };

    const foundedItem = filteredCollectionData.item;
    const filteredSectionsData = this.filterOutById(foundedItem.sections, sectionId);
    const wasFoundSection = !filteredSectionsData.error;
    if(!wasFoundSection) return { error: err_msg };  

    const foundedSection = filteredSectionsData.item;

    newCard.id = foundedSection.nextCardId;
    foundedSection.cards.push(newCard);
    foundedSection.nextCardId++;

    this.saveDataToCollection(data);

    const result = {
      error : !wasFoundSection || !wasFoundItem ? err_msg : null,
      addedCard : newCard,
      newCollection : data.collection,
      newItemOnFocus : foundedItem,
    }
    return result;
  },
  moveCard({moveTo, moveFrom, card, deskId}){
    const data = this.getData();
    const deskData = this.filterOutById(data.collection, deskId);
    if(deskData.error) return { error: deskData.error };

    const moveFromSectionData = this.filterOutById(deskData.item.sections, moveFrom);
    if(moveFromSectionData.error) return { error: moveFromSectionData.error };
    const moveToSectionData = this.filterOutById(deskData.item.sections, moveTo);
    if(moveToSectionData.error) return { error: moveToSectionData.error };

    const moveFromSection = moveFromSectionData.item;
    const moveToSection = moveToSectionData.item;

    moveFromSection.cards = moveFromSection.cards.filter((cardItem) => cardItem.id !== card.id);
    card.id = moveToSection.nextCardId;
    moveToSection.nextCardId++;

    moveToSection.cards.push(card);

    this.saveDataToCollection(data);

    const result = {
      movedCard : card,
      newCollection : data.collection,
      newItemOnFocus : deskData.item,
    }
    return result;
  }
}

export default MyStorage;
