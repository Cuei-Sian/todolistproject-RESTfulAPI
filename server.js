const { v4: uuidv4 } = require("uuid");
const http = require("http");
const todos = [];
// 測試用
// [
//   {
//     title: "記得刷牙",
//     id: uuidv4(),
//   },
// ];

const requestListener = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };

  if (req.url == "/todos" && req.method == "GET") {
    res.writeHead(200, headers);
    // 成功後將文字改成JSON格式的
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      }),
    );
    res.end();
  } else if (req.url == "/todos" && req.method == "POST") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      }),
    );
    res.end();
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      }),
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(3005);

// console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// const a = uuidv4();
// console.log("qq", a);
