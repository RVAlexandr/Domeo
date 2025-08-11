import { delay, http, HttpResponse } from "msw";
import { getObjectInfoById, getPaginatedObjectsList, ruFaker } from "./mocks";
import { isNaN } from "lodash";

const sleep = async () => {
  const isLongAwait = ruFaker.number.int({ min: 1, max: 4 }) > 2;

  let delayTime;
  if (isLongAwait) {
    delayTime = ruFaker.number.int({ min: 1000, max: 4000 });
  }
  await delay(delayTime);
};

export const handlers = [
  http.get("http://api.domeo.ru/objects", async ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 100);

    await sleep();

    if (isNaN(page) || isNaN(limit)) {
      throw HttpResponse.text("Invalid argument", { status: 400 });
    }

    const res = getPaginatedObjectsList({ page, limit });

    return HttpResponse.json(res);
  }),
  http.get("http://api.domeo.ru/objects/:id", async ({ params }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
      throw HttpResponse.text("Invalid argument", { status: 400 });
    }

    await sleep();

    const res = getObjectInfoById(id);

    if (res) {
      return HttpResponse.json(res);
    } else {
      throw HttpResponse.text("Object not found", { status: 404 });
    }
  }),
];
