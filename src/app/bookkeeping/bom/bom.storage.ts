import {MaterialBOM, BOM} from './bom.model';
import {FormArray} from '@angular/forms';

export class BomStorage {
  materials: MaterialBOM[] = [];
  lastid = -1;

  constructor() {
    this.materials = [];
  }

  _addMaterial(material: MaterialBOM, id?: string, parent_id?: string, level?: number ) {
    material.bom_service_id = id ? id : String(++this.lastid);
    material.bom_service_level = level ? level + 1 : 0;
    material.bom_service_parent = parent_id; //  ? parent_id : String(0)
    material.bom_service_child = [];
    this.materials[material.bom_service_id] = material;
    if (parent_id) {
      const parent_material = this.getMaterial(parent_id);
      material.bom_service_level = parent_material.bom_service_level + 1;
      parent_material.bom_service_child.push(material.bom_service_id);
    }
    return ({id: material.bom_service_id, level: material.bom_service_level});
  }

  getMaterial(materialId: string) {
    const materialFind = this.materials[materialId];
    if (!materialFind) {
      for (const material of this.materials) {
        if (material.id === materialId || material.bom_service_id === materialId ) { return material; }
      }
    }
    return materialFind;
  }

  changeParent(materialId: string, newParentId: string) {
    const material = this.getMaterial(materialId);
    const parent = this.getMaterial(material.bom_service_parent);
    const newParent = this.getMaterial(newParentId);
    material.bom_service_parent = newParentId;
    if (parent) {
      for (let i = 0; i < parent.bom_service_child.length; i++) {
        if (parent.bom_service_child[i] === materialId) {
          parent.bom_service_child.splice(i, 1);
        }
      }
    }
    newParent.bom_service_child.push(String(material.bom_service_id));
    material.bom_service_level = newParent.bom_service_level + 1;
  }

  newMaterial(id: string, name: string, count: number, price: number, bom_id?: number,
              desc?: string, image?: string, child?: MaterialBOM[], amount?: number, bom_service_id?: string,
              bom_service_child?: string[], bom_service_level?: number, bom_service_parent?: string): { id: string, level? } {
    const material = new MaterialBOM(id, name, count, price, bom_id, desc, image, child, amount,
      bom_service_id, bom_service_child, bom_service_level, bom_service_parent);
    return (this._addMaterial(material, material.bom_service_id));
  }

  dragIsFinish() {
    this.materials.map((material: MaterialBOM) => {
      material.over = false;
      return material;
    });
  }
}
