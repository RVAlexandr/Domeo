import { Faker, ru } from "@faker-js/faker";
import { chunk, shuffle } from "lodash";

export const ruFaker = new Faker({
  locale: [ru],
});

const createFakeObject = () => {
  const randomSex = ["male", "female"][ruFaker.number.int({ min: 0, max: 1 })];
  return {
    id: ruFaker.number.int({ min: 1000000, max: 9999999 }),
    address: `${ruFaker.location.state()}, ${ruFaker.location.city()}, ${ruFaker.location.streetAddress()}`,
    client_info: {
      first_name: ruFaker.person.firstName(randomSex),
      last_name: ruFaker.person.lastName(randomSex),
      middle_name: ruFaker.person.middleName(randomSex),
    },
    money_type: ruFaker.number.int({ min: 1, max: 2 }),
    cashout: ruFaker.number.int({ min: 10000, max: 100000 }),
  };
};

const objects = Array.from({ length: 100 }, createFakeObject);

export const getPaginatedObjectsList = ({ page, limit }) => {
  return chunk(objects, limit)[page - 1] || [];
};

const createTags = (count) => {
  const tags = [
    { message: "В работу", type: 1 },
    { message: "Срочный ремонт", type: 2 },
    { message: "Принят с долгом", type: 3 },
    { message: "Новый объект", type: 1 },
    { message: "Проблемный", type: 2 },
    { message: "Ремонт окончен", type: 4 },
  ];

  return shuffle(tags).slice(0, count);
};

const createObjectInfo = (objectInfo) => {
  const randomRC = [
    "Springs",
    "Ньютон",
    "AHEAD",
    "ЖК «Квартал LIFE TIME (ЛАЙФ ТАЙМ)»",
    "«Luzhniki Collection (Коллекция Лужники)»",
    "ЖК «hideOUT»",
  ][ruFaker.number.int({ min: 0, max: 4 })];

  const randomExecutor = [
    "OOO Меркурий",
    "ООО ДОМЕО",
    "ЗАО ПИК",
    "ООО Варданян и братья",
  ][ruFaker.number.int({ min: 0, max: 4 })];

  return {
    id: objectInfo.id,
    client_info: {
      ...objectInfo.client_info,
      phone: `+7${ruFaker.phone.number()}`,
      mail: ruFaker.internet.email(),
    },
    flat_info: {
      residental_complex: randomRC,
      flat_type: ruFaker.number.int({ min: 0, max: 1 }),
      repair_type: ruFaker.number.int({ min: 0, max: 4 }),
      executor: randomExecutor,
      area: ruFaker.number.int({ min: 80, max: 1400 }),
      elevator: ruFaker.number.int({ min: 0, max: 1 }) === 1,
    },
    status: ruFaker.number.int({ min: 1, max: 3 }),
    cashout: objectInfo.cashout,
    money_type: objectInfo.money_type,
    tags: createTags(ruFaker.number.int({ min: 1, max: 5 })),
  };
};

const objectInfoList = objects.reduce((acc, objectInfo) => {
  acc[objectInfo.id.toString()] = createObjectInfo(objectInfo);
  return acc;
}, {});

export const getObjectInfoById = (id) => {
  return objectInfoList[id];
};
