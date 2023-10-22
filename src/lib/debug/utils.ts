import clc from "cli-color";

const formatStatus = (status: number) => {
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

const formatMethod = (method: string) => {
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

export { formatMethod, formatStatus };
