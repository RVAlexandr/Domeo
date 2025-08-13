import { ref } from 'vue';
import { objectId } from './globals.ts';
import { ObjectData } from '../models/objectData.ts';
import { ClientInfo } from '../models/clientInfo.ts';
import { FlatInfo } from '../models/flatInfo.ts';
import { Tag } from '../models/tag.ts';

export const getObjectById = async () => {
  try {
    const response = await fetch(`http://api.domeo.ru/objects/${objectId.value}`);
    const data = await response.json();

    const objectInstance: ObjectData = new ObjectData(
      data.id,
      new ClientInfo(
        data.client_info.first_name,
        data.client_info.last_name,
        data.client_info.middle_name,
        data.client_info.phone,
        data.client_info.mail,
      ),
      new FlatInfo(
        data.flat_info.area,
        data.flat_info.elevator,
        data.flat_info.flat_type,
        data.flat_info.repair_type,
        data.flat_info.residental_complex,
      ),
      data.cashout,
      data.status,
      data.money_type,
      convertToTags(data.tags),
    );
    return objectInstance;
  } catch (e) {
    // error
  }
  return null;
};

function convertToTags(responseData: any[]): Tag[] {
  return responseData.map((obj) => new Tag(obj.message, obj.type));
}

export const pageNumber = ref(1);
export const perPage = ref(24);

export const getObjects = async () => {
  try {
    const response = await fetch(`http://api.domeo.ru/objects?page=${pageNumber.value}&limit=${perPage.value}`);
      return await response.json();
  } catch (e) {
    // error
  }
  return null;
};
