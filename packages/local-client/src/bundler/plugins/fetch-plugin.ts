import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

export enum fileType {
  JSX = 'jsx',
  CSS = 'css'
}

const fileCache = localForage.createInstance({
  name: "filecache",
});

const buildOnLoad = async (type: fileType, path: string): Promise<esbuild.OnLoadResult> => {
  const cacheResult = await fileCache.getItem<esbuild.OnLoadResult>(path);
  if (cacheResult) return cacheResult;
  const { data, request } = await axios.get(path);
  const result: esbuild.OnLoadResult = {
    loader: 'jsx',
    contents: getContent(type, data),
    resolveDir: new URL("./", request.responseURL).pathname,
  };
  await fileCache.setItem(path, result);
  return result;
}

const getContent = (type: fileType, data: any): string => {
  if (data === null || data === undefined) return "";
  if (type === fileType.JSX) return data;
  const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
  return `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
         `;
}

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {

      build.onLoad({ filter: /^index\.js$/ }, () => ({
        loader: 'jsx',
        contents: inputCode,
      }));

      build.onLoad({ filter: /\.css$/ }, async (args: any) => await buildOnLoad(fileType.CSS, args.path));

      build.onLoad({ filter: /.*/ }, async (args: any) => await buildOnLoad(fileType.JSX, args.path));
    },
  };
};
