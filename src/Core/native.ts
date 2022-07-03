/*
    Test 2022

    Authors: Colin Böttger
*/

interface API {
  writeToFile: (filename: string, data: string) => undefined;
  readFromFile: (filename: string) => string;

}
interface Pywebview {
  api: API;
}

declare let pywebview: Pywebview;

export let api = pywebview.api