import { v4 as uuidv4 } from "uuid";
import { createServer } from "http";
import errorHandle from "./errorHandle";
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
  let body = "";
  req.on("data", (chunk) => {
    console.log(chunk);
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    // 取得所有待辦
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
    // 新增單筆待辦
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title !== undefined) {
          const todo = {
            title: title,
            id: uuidv4(),
          };
          todos.push(todo);
          console.log(todo);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            }),
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
  } else if (req.url == "/todos" && req.method == "DELETE") {
    //刪除所有待辦
    todos.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todos,
      }),
    );
    res.end();
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    //刪除單筆待辦
    const id = req.url.split("/").pop();
    const index = todos.findIndex((element) => element.id == id);
    if (index !== -1) {
      todos.splice(index, 1);
      // console.log(id, index);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "success",
          data: todos,
        }),
      );
      res.end();
    } else {
      errorHandle(res);
    }
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    //編輯單筆待辦
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const index = todos.findIndex((element) => element.id == id);
        if (todo !== undefined && index !== -1) {
          todos[index].title = todo;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todos,
            }),
          );
          res.end();
        } else {
          errorHandle(res);
        }
      } catch (error) {
        errorHandle(res);
      }
    });
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

const server = createServer(requestListener);
server.listen(process.env.PORT || 3005);
