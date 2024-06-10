import { ReactNode } from 'react';
import RootSiblingsManager from 'react-native-root-siblings';
import AddPlant from './AddPlant';

export const showModal = (renderModal:any) => {
    let rootNode:any=null;
    const onClose = () => {
      rootNode?.destroy();
      rootNode = null;
    };
    rootNode = new RootSiblingsManager(renderModal(onClose));
    return onClose;
  };


  export const showAddPlant=(plantId:any,devicesId:any,callback:Function)=>{
    showModal((onClose:Function)=>{
  
        return <AddPlant plantId={plantId} onClose={onClose} devicesId={devicesId}  onConfim={callback}/>
    })
  }


 