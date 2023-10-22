import clc from "cli-color";

export const formatStatus = (status: number) => {
  switch (true) {
    case status >= 500:
      return clc.bgRed(` ${status} `);
    case status >= 400:
      return clc.bgYellow(` ${status} `);
    case status >= 300:
      return clc.bgCyan(` ${status} `);
    case status >= 200:
      return clc.bgGreen(` ${status} `);
    default:
      return clc.bgBlack();
  }
};

export const formatMethod = (method: string) => {
  switch (method) {
    case "GET":
      return clc.bgBlueBright(` ${method}      =>`);
    case "POST":
      return clc.bgCyan(` ${method}     =>`);
    case "PUT":
      return clc.bgYellow(` ${method}      =>`);
    case "PATCH":
      return clc.bgMagenta(` ${method}    =>`);
    case "DELETE":
      return clc.bgRed(` ${method}   =>`);
    default:
      return clc.bgBlack();
  }
};

function stripAnsi(str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[[0-9;]*m/g, "");
}

export { stripAnsi };
